import React from 'react';

import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
// import {Table} from 'react-bootstrap';
// import {Tab} from 'react-bootstrap';
// import moment from 'moment';
import Multiselect from 'react-bootstrap-multiselect'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class JobEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      location: '',
      details: '',
      status: '',
      materials: [],
      start_date: '',
      employees: [],
      supervisor: '',
      supervisors: [],
      comments: [],
      availableMaterials: [],
    }

  }

  componentDidMount() {
      this.getJob();
  }

  getSupervisors = () => {
   axios.get(`/api/v1/supervisors/`, {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}})
     .then(response => {
       console.log('response', response.data);
       this.setState({supervisors: response.data});
     })
     .catch(error => {
       console.log('Oops, something went wrong', error);
     })
 }

   getEmployees = () => {
       axios.get(`/api/v1/employees/`, {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}})
         .then(response => {
           console.log('response', response.data);
           let employees = [...this.state.employees];

           response.data.map(employee => {
               let obj = {};
               obj.value = employee.first_name + ' ' + employee.last_name;
               employees.push(obj);
               return obj
           });

           this.setState({employees});
         })
         .catch(error => {
           console.log('Oops, something went wrong', error);
         })
 }

   getMaterials = () => {
        axios.get(`/api/v1/materials/`, {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}})
         .then(response => {
           console.log('response', response.data);
           let availableMaterials = [...this.state.availableMaterials];

           response.data.map(material => {
               let obj = {};
               obj.value = material.text;
               availableMaterials.push(obj);
               return obj
           });

           this.setState({availableMaterials});
         })
         .catch(error => {
           console.log('Oops, something went wrong', error);
         })
 }

  getJob = () => {
    // console.log(this.props.match.params.id)
    // axios.get(`/api/v1/jobs/${this.props.match.params.id}`)
    axios.get(`/api/v1/jobs/${this.props.match.params.id}/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }).then(response => {
      // handle success
      console.log('job response', response);
      let data = Object.assign(this.state, response.data);
      this.setState({id: response.id})
      this.setState(data);
      this.getSupervisors();
      this.getMaterials();
      this.getEmployees();

    }).catch(error => {
      // handle error
      console.log(error);
    });
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDropdown = (status) => {
    console.log();
    this.setState({status});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      location: this.state.location,
      details: this.state.details,
      status: this.state.status
    }

    let formData = new FormData();

    let start_date = new Date(this.state.start_date);
    start_date = start_date.toISOString();

    formData.append('start_date',start_date);
    formData.append('location',this.state.location);
    formData.append('details', this.state.details);
    formData.append('materials', JSON.stringify(this.state.materials));
    formData.append('supervisor', this.state.supervisor.id);


    axios.patch(`/api/v1/jobs/${this.state.id}/`, formData, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // handle succes
      this.setState(data);
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  handleDelete = () => {
    axios.delete(`/api/v1/jobs/${this.props.match.params.id}`).then(response => {
      // handle success
      this.props.history.push('/schedule/')

    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  render() {
    // console.log(this.state);

    let statusOptions = {not_started: "Not Started", in_progress: "In Progress", complete: "Completed"}
    let key = this.state.status;
    let status = statusOptions[key];

    let materials = this.state.materials.map(material => <li key={material.id}>{material.text}</li>)
    // let employees = this.state.employees.map(employee => <li key={employee.id}>{employee.first_name}</li>)

    let supervisors = this.state.supervisors.map(supervisor => (
        <Dropdown.Item key={supervisor.id} name="supervisor" onClick={(e) => this.handleSelection(e, supervisor)}>{supervisor.first_name + " " + supervisor.last_name}</Dropdown.Item>
    ));
    let employees = this.state.employees.map(employee => (
        <Dropdown.Item key={employee.id} name="employee" onClick={(e) => this.handleSelection(e, employee)}>{employee.first_name + " " + employee.last_name}</Dropdown.Item>
    ));


    return (<div className="job_edit">
      <Row>
        <Col md={4}>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <h4>Edit Job</h4>
              <div className="d-flex flex-row">
              <div>
                <input className="add-input" type="date" name="start_date" placeholder="Start Date" value={this.state.start_date} onChange={this.handleInput}/>
                <br/>
                <input className="" type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput}/>
                <br/>
                <textarea rows="5" type="text" name="details" placeholder="Details" value={this.state.details} onChange={this.handleInput}/>
                <br/>
              </div>

              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {this.state.supervisor ? this.state.supervisor.first_name + " " + this.state.supervisor.last_name : 'Select Supervisor'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      {supervisors}
                  </Dropdown.Menu>
                </Dropdown>
                Select Employees:
                <Multiselect className="select-employees" data={this.state.employees} multiple />
                <br />
                Select Materials:
                <Multiselect className="select-materials" data={this.state.availableMaterials} multiple />
              </div>
            </div>
              <button name="save">Save</button>
            <button type="button" onClick={this.handleDelete}>Delete</button>

            <br/>
            <br/>
            <br/>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.employee ? this.state.employee.first_name + " " + this.state.employee.last_name: 'Select Employee'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  {employees}
              </Dropdown.Menu>
            </Dropdown>
          </form>
        </Col>
        <Col md={8}>
          <img className="imgAddJob" alt='add job' src="https://blogin.co/uploads/images/naslovna.png"/>

        </Col>
      </Row>
      <Row className="boxImg">
        <Col md={6}></Col>
        <Col md={8}>
          <img alt='burst communication process' src="http://remotework.works/wp-content/uploads/2018/06/BurstCommunicationProcess-1024x360.png"/>
        </Col>

      </Row>


      <Dropdown className="button">
                <Dropdown.Toggle variant="success" id="dropdown-basic" onChange={this.handleStatus}>
                    {status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handleDropdown("not_started")}>Not Started</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleDropdown("in_progress")}>In Progress</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleDropdown("complete")}>Completed</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


    </div>)
  }
}

export default JobEdit;

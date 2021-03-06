import React from 'react';
import axios from 'axios';
import {Col, Row, Dropdown} from 'react-bootstrap';
import Multiselect from 'react-bootstrap-multiselect'

// const BASE_URL = process.env.REACT_APP_BASE_URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class JobAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      start_date: '',
      location: '',
      details: '',
      materials: [],
      employee: '',
      supervisor: '',
      supervisors: [],
      employees: [],
      availableMaterials: []
    }
  }

  componentDidMount() {
    this.getSupervisors();
    this.getMaterials();
    this.getEmployees();
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelection = (e, selection) => {
    this.setState({
      [e.target.name]: selection
    }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name);

    // var date = new Date('MM-DD-YYYY')

    // let name = e.target.name;
    //
    // let location = this.state.location;
    // let details = this.state.details;
    // let materials = ['bricks', 'mortar'];
    // let employee_assigned = this.state.employee_assigned;

    let job = Object.assign({}, this.state);

    let formData = new FormData();

    let start_date = new Date(this.state.start_date);
    start_date = start_date.toISOString();

    formData.append('start_date', start_date);
    formData.append('location', this.state.location);
    formData.append('details', this.state.details);
    formData.append('materials', JSON.stringify(this.state.materials));
    formData.append('supervisor', this.state.supervisor.id);

    console.log('this state', this.state)

    axios({
      method: 'POST',
      url: '/api/v1/jobs/',
      data: formData,
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }).then(res => {
      console.log(res);
      this.props.history.push('/schedule/');

    }).catch(error => {
      console.log(error);
    })
  }

  getSupervisors = () => {
    axios.get(`/api/v1/supervisors/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log('response', response.data);
      this.setState({supervisors: response.data});
    }).catch(error => {
      console.log('Oops, something went wrong', error);
    })
  }

  getEmployees = () => {
    axios.get(`/api/v1/employees/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }).then(response => {
      this.setState({employees: response.data});
    }).catch(error => {
      console.log('Oops, something went wrong', error);
    })
  }

  getMaterials = () => {
    axios.get(`/api/v1/materials/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log('response', response.data);
      let availableMaterials = [...this.state.availableMaterials];

      response.data.map(material => {
        let obj = {};
        obj.value = material.text;
        availableMaterials.push(obj);
        return obj
      });

      this.setState({availableMaterials});
    }).catch(error => {
      console.log('Oops, something went wrong', error);
    })
  }

  render() {

    console.log('state', this.state);

    let supervisors = this.state.supervisors.map(supervisor => (<Dropdown.Item key={supervisor.id} name="supervisor" onClick={(e) => this.handleSelection(e, supervisor)}>{supervisor.first_name + " " + supervisor.last_name}</Dropdown.Item>));
    let employees = this.state.employees.map(employee => (<Dropdown.Item key={employee.id} name="employee" onClick={(e) => this.handleSelection(e, employee)}>{employee.first_name + " " + employee.last_name}</Dropdown.Item>));
    // let key = this.props.job.status;
    // let supervisors = supervisorOptions[key];

    // const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]

    return (<div className="add-job-form">
      <Row className="addjobform">
        <Col md={4}>
          <img className="imgAddJob" alt="add job" src="https://blogin.co/uploads/images/naslovna.png"/>

          <form className="addJobForm d-flex flex-column" onSubmit={this.handleSubmit}>
            <h4>Add Job</h4>
            <div className="d-flex flex-row">
              <div>
                <input className="add-input" type="date" name="start_date" placeholder="Start Date" value={this.state.start_date} onChange={this.handleInput}/>
                <br/>
                <input className="" type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput}/>
                <br/>
                <textarea className="addJobTextArea" rows="5" type="text" name="details" placeholder="Details" value={this.state.details} onChange={this.handleInput}/>
                <br/>
              </div>

              <div>
                <Dropdown className="jobAddDropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {
                      this.state.supervisor
                        ? this.state.supervisor.first_name + " " + this.state.supervisor.last_name
                        : 'Select Supervisor'
                    }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {supervisors}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="jobAddDropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {
                      this.state.employee
                        ? this.state.employee.first_name + " " + this.state.employee.last_name
                        : 'Select Employee'
                    }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {employees}
                  </Dropdown.Menu>
                </Dropdown>
                <Multiselect className="select-materials" data={this.state.availableMaterials} multiple="multiple"/>
              </div>
            </div>
            {/* <input type="text" name="employee_assigned" placeholder="Employee Assigned" value={this.state.employee_assigned} onChange={this.handleInput}/> */}
            <br/> {/* <button>Save Job</button> */}
            // <button className="jobSave" name=" save-and-add">Save and add another</button>
            <button className="jobSave" name="save">Save</button>
          </form>
        </Col>
      </Row>


    </div>)
  }
}

export default JobAdd;

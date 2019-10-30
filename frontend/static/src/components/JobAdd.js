import React from 'react';
import axios from 'axios';
import { Col, Row, Dropdown } from 'react-bootstrap';
import Multiselect from 'react-bootstrap-multiselect'

const BASE_URL = process.env.REACT_APP_BASE_URL

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
            employee_assigned: '',
            supervisor: '',
            supervisors: [],
            availableEmployees: [],
            availableMaterials: []
        }
    }

    componentDidMount() {
        this.getSupervisors();
        this.getMaterials();
        this.getEmployees();
    }

   handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
   }

   handleSelection = (e, selection) => {
       this.setState({[e.target.name]: selection});
   }

   handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.name);

        // let name = e.target.name;
        //
        // let location = this.state.location;
        // let details = this.state.details;
        // let materials = ['bricks', 'mortar'];
        // let employee_assigned = this.state.employee_assigned;


        let job = Object.assign({}, this.state);


        let formData = new FormData();
        formData.append( 'start_date',job.start_date);
        formData.append('location',job.location);
        formData.append('details', job.details);
        formData.append('materials', JSON.stringify(job.materials));
        // formData.append('supervisor', 12);

        axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/jobs/',
            data: formData
        })
            .then(res => {
                console.log(res);
                this.props.history.push('/schedule/');
            })
            .catch(error => {
                console.log(error);
            })
   }

   getSupervisors = () => {
    axios.get(`${BASE_URL}/api/v1/supervisors/`)
      .then(response => {
        console.log('response', response.data);
        this.setState({supervisors: response.data});
      })
      .catch(error => {
        console.log('Oops, something went wrong', error);
      })
  }

     getEmployees = () => {
        axios.get(`${BASE_URL}/api/v1/employees/`)
          .then(response => {
            this.setState({availableEmployees: response.data});
          })
          .catch(error => {
            console.log('Oops, something went wrong', error);
          })
  }

  getMaterials = () => {
         axios.get(`${BASE_URL}/api/v1/materials/`)
          .then(response => {
            console.log('response', response.data);
            let availableMaterials = [...this.state.availableMaterials];

            response.data.map(material => {
                let obj = {};
                obj.value = material.text;
                availableMaterials.push(obj);
            });

            this.setState({availableMaterials});
          })
          .catch(error => {
            console.log('Oops, something went wrong', error);
          })
  }


    render() {

        console.log('state', this.state)

        let supervisors = this.state.supervisors.map(supervisor => (
            <Dropdown.Item name="supervisor" onClick={(e) => this.handleSelection(e, supervisor)}>{supervisor.first_name + " " + supervisor.last_name}</Dropdown.Item>
        ));

        // const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]

        return (

        <div className="add-job-form">
            <Row>
                <Col md={4}>
            <form onSubmit={this.handleSubmit}>
                <h4>Add Job</h4>
                <input className="add-input" type="text" name="start_date" placeholder="Start Date" value={this.state.start_date} onChange={this.handleInput}/>
                <br/>
                <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput}/>
                <br/>
                <textarea rows="5" type="text" name="details" placeholder="Details" value={this.state.details} onChange={this.handleInput}/>
                <br/>

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {this.state.supervisor ? this.state.supervisor.first_name + " " + this.state.supervisor.last_name : 'Select Supervisor'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      {supervisors}
                  </Dropdown.Menu>
                </Dropdown>

                <Multiselect className="select-materials" data={this.state.availableMaterials} multiple />

                {/*<input type="text" name="employee_assigned" placeholder="Employee Assigned" value={this.state.employee_assigned} onChange={this.handleInput}/>*/}
                <br/>
                {/*<button>Save Job</button>*/}
                <button name="save-and-add" onClick={this.handleSubmit}>Save and add another</button>
                <button name="save" onClick={this.handleSubmit}>Save</button>


            </form>
            </Col>
            <Col md={8}>
                <img className="imgAddJob"  src="https://blogin.co/uploads/images/naslovna.png" />

            </Col>
            </Row>
            <Row className="boxImg">
                 <Col md={6}>
                <img className="imgLeft"  src="https://blogin.co/uploads/images/naslovna.png" />
                 </Col>
                 <Col md={6}>
                <img className="imgRight"  src="https://blogin.co/uploads/images/naslovna.png" />
            </Col>


            </Row>

         </div>



        )
    }
}

export default JobAdd;
import React from 'react';

import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import {Table} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import moment from 'moment';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class JobEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      location: '',
      details: '',
      status: ''
    }

  }

  componentDidMount() {
    this.getJob();
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
      // console.log(response);
      let data = Object.assign(this.state, response.data);
      this.setState(data);

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

    this.setState({status});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      location: this.state.location,
      details: this.state.details,
      status: this.state.status
    }
    axios.patch(`/api/v1/jobs/3/`, data, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // handle succes
      this.setState(data);
      this.setState({details: "", location: "", status: ""})

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
    console.log(this.state);

    let statusOptions = {not_started: "Not Started", in_progress: "In Progress", complete: "Completed"}
    let key = this.state.status;
    let status = statusOptions[key];


    return (<div className="job_edit">
      <Row>
        <Col md={4}>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <h4>Edit</h4>
            <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput}/>
            <br/>
            <input type="text" name="details" placeholder="Details" value={this.state.details} onChange={this.handleInput}/>
            <br/>
            <input type="text" name="status" placeholder="Status" value={this.state.status} onChange={this.handleInput}/>
            <br/>
            <button>Save</button>
            <button type="button" onClick={this.handleDelete}>Delete</button>
          </form>
        </Col>
        <Col md={8}>
          <img className="imgAddJob" src="https://blogin.co/uploads/images/naslovna.png"/>

        </Col>
      </Row>
      <Row className="boxImg">
        <Col md={6}></Col>
        <Col md={8}>
          <img src="http://remotework.works/wp-content/uploads/2018/06/BurstCommunicationProcess-1024x360.png"/>
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

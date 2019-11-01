import React from 'react';

import axios from 'axios';
import {Col, Row} from "react-bootstrap";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class JobEdit extends React.Component {

    constructor(props){
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
        axios.get(`/api/v1/jobs/${this.props.match.params.id}`)
            .then(response =>  {
                // handle success
                // console.log(response);
                let data = Object.assign(this.state, response.data);
                this.setState(data);

            })
            .catch (error => {
                // handle error
                console.log(error);
            });
    };

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`/api/v1/jobs/${this.state.id}`, this.state)
            .then(response =>  {
                // handle success
                let data = Object.assign(this.state, response.data);
                this.setState(data);

            })
            .catch (error => {
                // handle error
                console.log(error);
            });
    }

    handleDelete = () => {
        axios.delete(`/api/v1/jobs/${this.state.id}`)
            .then(response =>  {
                // handle success
                this.props.history.push('/schedule/')

            })
            .catch (error => {
                // handle error
                console.log(error);
            });
    }

    render() {
        console.log(this.state);
        return (
            <div className="job_edit">
                <Row>
                    <Col md={4}>
            <form onSubmit={this.handleSubmit}>
                <h4>Edit</h4>
                <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput} name="location"/>
                <br/>
                <input type="text" name="location" placeholder="Details"value={this.state.details} onChange={this.handleInput} name="details"/>
                <br/>
                <input type="text" name="location" placeholder="Status"value={this.state.status} onChange={this.handleInput} name="status"/>
                <br/>
                <button>Save</button>
                <button type="button" onClick={this.handleDelete}>Delete</button>
            </form>
                        </Col>
            <Col md={8}>
                <img className="imgAddJob"  src="https://blogin.co/uploads/images/naslovna.png" />

            </Col>
            </Row>
            <Row className="boxImg">
                 <Col md={6}>

                 </Col>
                 <Col md={8}>
                <img src="http://remotework.works/wp-content/uploads/2018/06/BurstCommunicationProcess-1024x360.png" />
            </Col>


            </Row>

         </div>

        )
    }
}

export default JobEdit;

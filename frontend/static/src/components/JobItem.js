import React from 'react';
import axios from 'axios';
import {Dropdown} from "react-bootstrap";
import {Table} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import moment from 'moment';



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



class JobItem extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          status: ''
      }


    }



    // let updateStatus = (event) => {
    //   console.log(event.target.name)
    //     this.props.
    // }

    handleStatus = (e) => {
        console.log('event firing onchange')
    }

    render() {
        let statusOptions = {not_started: "Not Started", "in_progress": "In Progress", "complete": "Completed"}
        let key = this.props.job.status;
        let status = statusOptions[key];
        return (
    <tr className="schedule.color">
      <td className="schedule.list">{this.props.index}</td>
      <td>#</td>
      <td>{moment(this.props.job.start_date).format("LL")}</td>
      <td><a href={"/jobs/detail/"+this.props.job.id}>{this.props.job.location}</a></td>
      <td>{this.props.job.supervisor.username}</td>
      <td><Dropdown className="button">
                <Dropdown.Toggle variant="success" id="dropdown-basic" onChange={this.handleStatus}>
                    {status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item name="not_started" onClick={(e) => this.props.updateStatus("not_started", this.props.job)}>Not Started</Dropdown.Item>
                    <Dropdown.Item name="in_progress" onClick={(e) => this.props.updateStatus("in_progress", this.props.job)}>In Progress</Dropdown.Item>
                    <Dropdown.Item name="complete" onClick={(e) => this.props.updateStatus("complete", this.props.job)}>Completed</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown></td>
    </tr>
  );
    }

}

export default JobItem;

import React from 'react';
import JobItem from './JobItem';
import {Table} from 'react-bootstrap';

import axios from 'axios';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL

class JobList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        jobs: [],
        status:"",
    }
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs = () => {
    axios.get(`${BASE_URL}/api/v1/jobs/`)
      .then(response => {
        console.log('response', response.data);
        this.setState({jobs: response.data});
      });
      // .catch(error => {
      //   console.log('Oops, something went wrong', error);
    // })
  }

  updateStatus = (status, job) => {
      axios.patch(`${BASE_URL}/api/v1/jobs/${job.id}`,{status:status})
      .then(response => {
        console.log('update sent', response.data);
        let jobs = [...this.state.jobs];
        let index = jobs.indexOf(job);

        jobs[index].status = status;
        this.setState({jobs});

        if(status === 'complete'){
            axios.post(`${BASE_URL}/api/v1/twiliocall/`)
                .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        }
      })
      .catch(error => {
        console.log('Oops, something went wrong', error);
      })
  }

  render() {
    let rows = this.state.jobs.map((job, index) => {
      return <JobItem key={job.id} job={job} index={index + 1} updateStatus={this.updateStatus}/>
    });

    return(<Table responsive>
              <thead className="head-item">
                <tr className="ttr">
                  <th>#</th>
                  <th>Start Date</th>
                  <th>Location</th>
                  <th>Supervisor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
              </Table>)
  }
}

export default JobList;

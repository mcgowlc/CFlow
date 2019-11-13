import React from 'react';
import JobItem from './JobItem';
import {Table} from 'react-bootstrap';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// const BASE_URL = process.env.REACT_APP_BASE_URL

class JobList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        jobs: []
    }
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs = () => {
    axios.get(`/api/v1/jobs/`, {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}})
      .then(response => {
        // console.log('response', response.data);
        this.setState({jobs: response.data});
      })
      .catch(error => {
        console.log('Oops, something went wrong', error);
    });
  }

  updateStatus = (status, job) => {
      axios.patch(`/api/v1/jobs/${job.id}/`,{status:status}, {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}})
      .then(response => {
        console.log('update sent', response.data);
        let jobs = [...this.state.jobs];
        let index = jobs.indexOf(job);

        jobs[index].status = status;
        this.setState({jobs});

        if(status === 'in progress, complete'){
            axios.post(`/api/v1/twiliocall/`)
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
    console.log('joblist component');
    let rows = this.state.jobs.map((job) => {
      return <JobItem key={job.id} job={job} updateStatus={this.updateStatus}/>
    });

    return(<Table responsive>
              <thead className="head-item">
                  <tr className="ttr">
                  <th></th>
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

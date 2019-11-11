import React from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";


// import divWithClassName from "react-bootstrap/es/utils/divWithClassName";

const BASE_URL = process.env.REACT_APP_BASE_URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
      // console.log(this.props);
        return (
            <form onSubmit={(e) => this.props.addComment(e, this.state.text)}>
                <input type="text" name="text" value={this.state.text} onChange={this.handleInput}/>
                <button>Save Comment</button>

            </form>
        )
    }
}



class JobDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            supervisor: '',
            employees: [],
            location: '',
            details: '',
            materials: [],
            start_date: '',
            status: '',
            comments: []
        }
    }

    componentDidMount() {
        this.getJob();
    }

      deleteComment = (comment) => {

        let comments = [...this.state.comments];

        axios.delete(`/api/v1/comments/${comment.id}`)
            .then(response =>  {
                // handle success
                // this.props.history.push('/schedule/')
                let index = comments.indexOf(comment);
                comments.splice(index, 1);
                this.setState({comments});

            })
            .catch (error => {
                // handle error
                console.log(error);
            });
    }

    getJob = () => {
        axios.get(`/api/v1/jobs/${this.props.match.params.id}`)
            .then(response =>  {
                // handle success
                // console.log(response);
                this.setState(response.data);
            })
            .catch (error => {
                // handle error
                console.log(error);
            });
    };

    addComment = (e, text) => {
        e.preventDefault();
        console.log('text', text);

        let comments = [...this.state.comments];

        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json' },
          data: {text: text, job: this.state.id, user: 20},
          url: `${BASE_URL}/api/v1/comments/`,
        };

        axios(options)
            .then(response =>  {
                console.log(response);
                comments.push(response.data);
                this.setState({comments});
            })
            .catch (error => {
                console.log(error);
            });

    }


    render() {


        console.log(this.props);
        let employees = this.state.employees.map((employee) => {
            return <div key={employee.id}>{employee.username}</div>
        });

        let materials = this.state.materials.map((material) => {
            return <div key={material.id}>{material.text}</div>
        });

        let comments = this.state.comments.map(comment => {
            return <div key={comment.id}>{comment.text}
                <button type="button" onClick={() => this.deleteComment(comment)}>Delete</button>
                </div>
        })

        return (
            <div>
                <button className="btn-light" value='edit'><NavLink className="edit" to={`/jobs/edit/${this.props.match.params.id}`}>Edit</NavLink></button>
                <h3>{this.state.location}</h3>
                <p>Supervisor- {this.state.supervisor.username}</p>
                <p>Details- {this.state.details}</p>
                <p>Employees:</p>
                {employees}
                <br/>
                <p>Materials:</p>
                {materials}
                <br/>
                <p>Start Date- {moment(this.props.job.start_date).format("LL")}</p>
                <p>Job Status- {this.state.status}</p>
                <br/>
                <p>Comments:</p>
                {comments}
                <Comment addComment={this.addComment} />



            </div>


        )
    }
}

export default JobDetail;

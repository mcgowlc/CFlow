import React from 'react';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',
        }
    }

    handleInput = (e) => {
        // e is the event
        // e.target is the input
        // e.target.name is pulling the value of the name attribute off of the input I typed in

        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        // default behavior of a form submit is to reload the page
        // e.preventDefault() prevents the page from reloading / stops the default behavior
        e.preventDefault();

        axios({
            method: 'POST',
            url: '/api/v1/rest-auth/registration/',
            data: this.state
        })
            .then(res => {
                console.log(res);
                // save the token we get back once we successfully login to localStorage
                localStorage.setItem('token', res.data.key);
                this.props.history.push('/schedule');
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="username" value={this.state.username}
                       onChange={this.handleInput}/>
                <br/>
               <input type="email" name="email" placeholder="email" value={this.state.email}
                       onChange={this.handleInput}/>
                <br/>
                <input type="password" name="password1" placeholder="password" value={this.state.password1}
                       onChange={this.handleInput}/>
                <br/>
               <input type="password" name="password2" placeholder="confirm password" value={this.state.password2}
                       onChange={this.handleInput}/>
                <br/>
                <button type="submit" value="Register">Register</button>
                {/*<input type="submit" value="Register"/>*/}
            </form>
        )
    }
}

export default Register;

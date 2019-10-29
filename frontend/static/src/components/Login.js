import React from 'react';

import axios from 'axios';
import {NavLink} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Login extends React.Component {
    constructor(props) {
        super(props);

      this.state = {
          username: '',
          password: '',
      }
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
}

    handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: '/api/v1/rest-auth/login/',
            data: this.state
        })
            .then(res => {
                console.log(res);
              //save the token I get back once I succeefully login to localStorage
              localStorage.setItem('token', res.data.token);
              // console.log('this', this)
              this.props.history.push('/schedule');
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
                <div className=" hero">
                    <div className="login-form">
                    <form  onSubmit={this.handleSubmit}>
                        <div className="container">
                        <input className="login-input" type="text" name="username" placeholder="Enter username" value={this.state.username}
                               onChange={this.handleInput}/>
                               <br/>
                        <input type="password" name="password" placeholder="Enter password" value={this.state.password}
                               onChange={this.handleInput}/>
                               <br/>
                        <input type="submit" value="Login"/>
                        <br/>
                        <button className="btn-light" value='register'><NavLink className="register" to="/accounts/register">Register</NavLink></button>
                        </div>
                    </form>

                    </div>
                </div>
        )
    }
}

export default Login;

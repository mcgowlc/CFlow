import React from 'react';
import { NavLink } from "react-router-dom";
import logo from './../images/CFlowLogo.png'

function BaseLayout(props) {

    function logout (){
      localStorage.clear();
      return console.log('hello')
    }

    // function based components use props instead of this.props
    // class based components you call this.props

    return (
        <div>


            <div className="nav">
                <ul className="nav-bar">
                  <div class="logo">
                    <img src={logo} alt="" />
                    <NavLink className="nav-link" to="/">Home Page</NavLink>
                    {/*<NavLink className="nav-link" to="/accounts/register">Register</NavLink>*/}
                    <NavLink className="nav-link" to="/accounts/login">Login</NavLink>
                    <NavLink className="nav-link" to="/accounts/login" onClick={logout}>Logout</NavLink>
                    <NavLink className="nav-link" to="/schedule">Schedule</NavLink>
                    <NavLink className="nav-link" to="/jobs/new">Add Job</NavLink>
                    </div>

                </ul>

            </div>
            {props.children}
        </div>
    )
}


export default BaseLayout;

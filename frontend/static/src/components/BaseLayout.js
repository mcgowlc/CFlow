import React from 'react';
import { NavLink } from "react-router-dom";

function BaseLayout(props) {



    // function based components use props instead of this.props
    // class based components you call this.props

    return (
        <div>
            <div className="nav">
                <ul className="nav-bar">
                    <NavLink className="nav-link" to="/">Home Page</NavLink>
                    {/*<NavLink className="nav-link" to="/accounts/register">Register</NavLink>*/}
                    <NavLink className="nav-link" to="/accounts/login">Login</NavLink>
                    <NavLink className="nav-link" to="/schedule">Schedule</NavLink>
                    <NavLink className="nav-link" to="/jobs/new">AddJob</NavLink>
                    <NavLink className="nav-link" to="/jobs/edit">JobEdit</NavLink>
                    


                </ul>
            </div>
            {props.children}
        </div>
    )
}


export default BaseLayout;

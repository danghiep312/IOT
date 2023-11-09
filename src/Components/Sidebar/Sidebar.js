import React from "react";
import {NavLink} from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" activeClassName="active" exact>
                Home
            </NavLink>
            <NavLink to="/profile" activeClassName="active">
                Profile
            </NavLink>
            <NavLink to="/history" activeClassName="active">
                History
            </NavLink>
            <NavLink to="/control" activeClassName="active">
                Control
            </NavLink>
        </div>
    );
};

export default Sidebar;

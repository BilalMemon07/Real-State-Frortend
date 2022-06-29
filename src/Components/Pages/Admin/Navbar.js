import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../../../Images/logo_final.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" end to="/admin">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

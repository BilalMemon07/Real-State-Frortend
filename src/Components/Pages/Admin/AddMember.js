// import Tags from "../../../../node_modules/bootstrap5-tags/tags";
// import Tags from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-tags@master/tags.js";
import axios from "../../../api/axios";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const CUSTOMER_URL = "/customers";

const AddMember = () => {
  // Tags.init();
  const navigate = useNavigate();
  const [member, setmember] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "",
    tl: "",
    team_name: "",
    team_id: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setmember({ ...member, [name]: value });
  };

  async function PostData(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/user", member, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      window.alert("User Registered Successfully");
    } catch (err) {
      window.alert(`${err} User Registration Failed`);
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg("Registration Failed");
      // }
    }

    // const { name, phone, email, password, cpassword, tl, team_name, team_id } =
    //   member;
    // try {
    //   const res = await axios.post("/user", member, {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   });
    //   window.alert("User Registered Successfully");
    //   navigate("/login");
    // } catch (error) {
    //   window.alert(`${error.response.data.error}`);
    // }

    // const data = await response.json();

    // if (res.status === 422 || !data) {
    //   window.alert("Oops! Something went wrong... Failed");
    // } else {
    //   window.alert("Lead creation Successful");
    //   // navigate("/login");
    //   // history.push("/login");
    // }
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <section>
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Add Member</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={member.name}
                    onChange={handleInputs}
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={member.email}
                    onChange={handleInputs}
                    placeholder="Email id"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={member.phone}
                    onChange={handleInputs}
                    placeholder="Phone no"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={member.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={member.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    autoComplete="off"
                    value={member.role}
                    onChange={handleInputs}
                    placeholder="Role"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="team_name">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="team_name"
                    id="team_name"
                    autoComplete="off"
                    value={member.team_name}
                    onChange={handleInputs}
                    placeholder="Team Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tl">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="tl"
                    id="tl"
                    autoComplete="off"
                    value={member.tl}
                    onChange={handleInputs}
                    placeholder="Team Leader name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="team_id">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="team_id"
                    id="team_id"
                    autoComplete="off"
                    value={member.team_id}
                    onChange={handleInputs}
                    placeholder="Team ID"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    value="Submit"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddMember;

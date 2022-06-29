import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const CUSTOMER_URL = "/customers";

const Addlead = () => {
  const navigate = useNavigate();
  const [customer, setcustomer] = useState({
    cname: "",
    cemail: "",
    cphone: "",
    sales_assigned: "",
    country: "",
    city: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setcustomer({ ...customer, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { cname, cphone, cemail, sales_assigned, country, city } = customer;

    console.log(cname);
    try {
      const response = await axios.post(
        CUSTOMER_URL,
        JSON.stringify({
          cname,
          cphone,
          cemail,
          sales_assigned,
          country,
          city,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err?.response);
    }

    // const data = await response.json();

    // if (res.status === 422 || !data) {
    //   window.alert("Oops! Something went wrong... Failed");
    // } else {
    //   window.alert("Lead creation Successful");
    //   // navigate("/login");
    //   // history.push("/login");
    // }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <section>
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Add Lead</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="cname"
                    id="cname"
                    autoComplete="off"
                    value={customer.cname}
                    onChange={handleInputs}
                    placeholder="Customer Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="text"
                    name="cemail"
                    id="cemail"
                    autoComplete="off"
                    value={customer.cemail}
                    onChange={handleInputs}
                    placeholder="Customer email id"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="cphone"
                    id="cphone"
                    autoComplete="off"
                    value={customer.cphone}
                    onChange={handleInputs}
                    placeholder="Customer Phone no"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sales_assigned">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="sales_assigned"
                    id="sales_assigned"
                    autoComplete="off"
                    value={customer.sales_assigned}
                    onChange={handleInputs}
                    placeholder="Sales assigned person name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="off"
                    value={customer.country}
                    onChange={handleInputs}
                    placeholder="Customer country name..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="off"
                    value={customer.city}
                    onChange={handleInputs}
                    placeholder="Customer city name"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    value="register"
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

export default Addlead;

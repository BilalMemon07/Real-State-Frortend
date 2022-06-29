import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerP, setcustomerP] = useState([]);

  useEffect(() => {
    async function getCustomer() {
      try {
        const cust = await axios.get(`/customerprofile/${id}`);

        setcustomerP(cust.data);

        // const { cname, cemail, city, country } = cust.data;
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    getCustomer();
  }, [id]);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setcustomerP({ ...customerP, [name]: value });
  };

  async function PostData(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`/customerprofile/${id}`, customerP);
      window.alert("Customer Profile Successfully Updated");
    } catch (error) {
      window.alert("Oops! Something went wrong... Failed");
    }
  }

  // const [customer, setcustomer] = useState({
  //   project_required: "",
  //   project_source: "",
  //   marital_status: "",
  //   no_of_kids: "",
  //   home_buying_experience: "",
  //   objective: "",
  //   financing_condition: "",
  //   comment: "",
  //   occupation: "",
  //   occupation_details: "",
  // });

  // const PostData = async (e) => {
  //   e.preventDefault();

  //   const {
  //     project_required,
  //     project_source,
  //     marital_status,
  //     no_of_kids,
  //     home_buying_experience,
  //     objective,
  //     financing_condition,
  //     comment,
  //     occupation,
  //     occupation_details,
  //   } = customer;

  //   // const res = await fetch(`/profile/update/${userId}`, {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({
  //   //     project_required,
  //   //     project_source,
  //   //     marital_status,
  //   //     no_of_kids,
  //   //     home_buying_experience,
  //   //     objective,
  //   //     financing_condition,
  //   //     comment,
  //   //     occupation,
  //   //     occupation_details,
  //   //   }),
  //   // });

  //   // const data = await res.json();

  //   // if (res.status === 422 || !data) {
  //   //   window.alert("Oops! Something went wrong... Failed");
  //   // } else {
  //   //   window.alert("Lead creation Successful");
  //   //   // navigate("/login");
  //   //   // history.push("/login");
  //   // }
  // };

  return (
    <>
      <Navbar />
      <Sidebar />
      <section>
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Customer Profile</h2>
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
                    value={customerP.cname}
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
                    value={customerP.cemail}
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
                    value={customerP.cphone}
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
                    value={customerP.sales_assigned}
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
                    value={customerP.country}
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
                    value={customerP.city}
                    onChange={handleInputs}
                    placeholder="Customer city name"
                  />
                </div>

                {/* <div className="form-group">
                <label htmlFor="project_required">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="project_required"
                  id="project_required"
                  value={customerP.project_required}
                  onChange={handleInputs}
                  placeholder="Project Required"
                />
              </div>

              <div className="form-group">
                <label htmlFor="project_source">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="project_source"
                  id="project_source"
                  value={customer.project_source}
                  onChange={handleInputs}
                  placeholder="Project source"
                />
              </div>

              <div className="form-group">
                <label htmlFor="marital_status">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="marital_status"
                  id="marital_status"
                  autoComplete="off"
                  value={customer.marital_status}
                  onChange={handleInputs}
                  placeholder="Customer marital status"
                />
              </div>

              <div className="form-group">
                <label htmlFor="no_of_kids">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="no_of_kids"
                  id="no_of_kids"
                  autoComplete="off"
                  value={customer.no_of_kids}
                  onChange={handleInputs}
                  placeholder="No of kids"
                />
              </div>

              <div className="form-group">
                <label htmlFor="home_buying_experience">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="home_buying_experience"
                  id="home_buying_experience"
                  autoComplete="off"
                  value={customer.home_buying_experience}
                  onChange={handleInputs}
                  placeholder="Home buying experience"
                />
              </div>

              <div className="form-group">
                <label htmlFor="objective">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="objective"
                  id="objective"
                  autoComplete="off"
                  value={customer.objective}
                  onChange={handleInputs}
                  placeholder="Objective"
                />
              </div>

              <div className="form-group">
                <label htmlFor="financing_condition">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="financing_condition"
                  id="financing_condition"
                  autoComplete="off"
                  value={customer.financing_condition}
                  onChange={handleInputs}
                  placeholder="Financing Condition"
                />
              </div>

              <div className="form-group">
                <label htmlFor="comment">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Comment"
                />
              </div>

              <div className="form-group">
                <label htmlFor="occupation">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  autoComplete="off"
                  value={customer.occupation}
                  onChange={handleInputs}
                  placeholder="Occupation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="occupation_details">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="occupation_details"
                  id="occupation_details"
                  autoComplete="off"
                  value={customer.occupation_details}
                  onChange={handleInputs}
                  placeholder="Occupation details"
                />
              </div> */}

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    value="register"
                    onClick={PostData}
                  />
                  <button
                    onClick={() => {
                      navigate("/allleads");
                    }}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerProfile;

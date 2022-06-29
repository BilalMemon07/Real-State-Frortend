import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../Css/mycss.css";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import moment from "moment";

function LeadAll() {
  const navigate = useNavigate();
  const date = moment().format("DD MMM YYYY hh:mm:ss A");
  const { id } = useParams();

  const [customer, setcustomer] = useState({
    date_created: date,
    // _id: id,
    meeting: "",
    option: "",
    disposition: "",
    comment: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setcustomer({ ...customer, [name]: value });
  };

  // **************** GET Request *******************************

  const [customerP, setcustomerP] = useState([]);

  useEffect(() => {
    async function getCustomer() {
      try {
        const cust = await axios.get(`/disposition/${id}`);
        setcustomerP(...customerP, cust.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    getCustomer();
  }, [id]);

  // ############################################################################

  // *************************************************************

  async function PostData(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`/AddDisposition/${id}`, customer);
      window.alert("Add disposition Successfully Updated");
      navigate("/allleads");
    } catch (error) {
      window.alert("Oops! Something went wrong... Failed");
    }
  }

  //############# Disposition End  #########################################

  const [users, setUser] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    loadUser();
  }, []);

  const controller = new AbortController();
  const loadUser = async () => {
    const response = await axiosPrivate.get("/customers", {
      signal: controller.signal,
    });
    // console.log(result.data);
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`/all_leads/${id}`);
    // const data = await res.json();

    if (res) {
      window.alert("One Lead deleted Successfully");
      loadUser();
    } else {
      // navigate("/login");
      // history.push("/login");
      window.alert("Oops! Something went wrong... Failed");
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Sales Lead Disposition----2480918
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="yondro">
                <div class="part1">
                  <div class="item1">Progress</div>
                  <div class="item2">
                    <span>
                      <span
                        class="fa fa-circle"
                        style={{ color: "green" }}
                      ></span>
                      Initial Contact
                    </span>
                    <span>
                      <span
                        class="fa fa-circle"
                        style={{ color: "gray" }}
                      ></span>
                      Meeting Stage
                    </span>
                    <span>
                      <span
                        class="fa fa-circle"
                        style={{ color: "gray" }}
                      ></span>
                      SV stage
                    </span>
                    <span>
                      <span
                        class="fa fa-circle"
                        style={{ color: "gray" }}
                      ></span>
                      FN stage
                    </span>
                    <span>
                      <span
                        class="fa fa-circle"
                        style={{ color: "gray" }}
                      ></span>
                      Initial contact
                    </span>
                  </div>
                </div>
                <div class="part2">
                  <div class="items1">Disposition</div>
                  <div class="items2">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">Not Interested</option>
                      <option value="2">Not Recieved</option>
                      <option value="3">Switch off/Out of reach</option>
                      <option value="4">Site Visit Planned</option>
                      <option value="5">Site Visit Postponed</option>
                      <option value="6">Site Visit Done</option>
                      <option value="7">Fn Planned</option>
                      <option value="8">Fn Postponed</option>
                      <option value="9">Fn Done</option>
                      <option value="10">Closure</option>
                    </select>
                  </div>
                  <div class="items3">Comment</div>
                  <div class="items4">
                    <textarea
                      name="w3review"
                      style={{
                        width: "373px",
                        padding: "5px 0 0 10px",
                        height: "80px",
                        resize: "none",
                      }}
                    ></textarea>
                  </div>
                </div>
                <div
                  class="table-responsive"
                  style={{ maxheight: "160px", marginTop: "25px" }}
                >
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Disposition</th>
                        <th scope="col">Sub Disposition</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody class="overflow-auto">
                      {customerP?.map((data) => (
                        <tr key={data.date_created}>
                          <th scope="row">{data.date_created}</th>
                          <td>{data.disposition}</td>
                          <td>{data.comment}</td>
                          <td>{data.option}</td>
                          <td>{data.meeting}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div class="continer-fluid"> */}
        {/* <div class="row-fluid"> */}
        {/* <div class="col-sm-7"> */}
        <h1 className="text-center mb-5">ALL LEADS</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Project</th>
                <th scope="col">Sales Assigned</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((data) => (
                <tr key={data.Lead_ID}>
                  <th scope="row">{data.Lead_ID}</th>
                  <td>{data.cname}</td>
                  <td>{data.project_source}</td>
                  <td>{data.sales_assigned}</td>
                  <td>
                    <button onClick={() => deleteUser(data.Lead_ID)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      {/* <Link to={`/disposition/${data.Lead_ID}`}> */}
                      Add Disposition
                      {/* </Link> */}
                    </button>
                    <button
                    // onClick={() => {
                    //   navigate("/customerprofile", { state: data });
                    // }}

                    // onClick={() => {
                    //   navigate(`/customerprofile/${data.lead_id}`);
                    // }}
                    >
                      <Link to={`/customerprofile/${data.Lead_ID}`}>
                        Add Profile
                      </Link>
                    </button>
                    <button>Show data</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
    // </div>
    // </div>
  );
}

export default LeadAll;

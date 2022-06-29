import "../../../Css/sidebars.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import useLogout from "../../../hooks/useLogout";
import axios from "axios";
// import { UserContext } from "../../../App";
import Cookies from "js-cookie";

function Sidebar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  // const { state, dispatch } = useContext(UserContext);

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  // const logout = async () => {
  //   // try {
  //   //   await axios.get("/logout");
  //   //   const data = { type: "USER", status: false };
  //   //   dispatch({ type: "USER", payload: data });
  //   //   localStorage.removeItem("jwtoken");
  //   //   Cookies.remove("jwtoken");
  //   //   navigate("/");
  //   //   // window.location.reload();
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/usermenu", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": true,
        },

        credentials: "include",
      });

      const data = await res.json();
      console.log(data.name);
      setUserData(data);

      if (!res.status === 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <section>
        <div
          className="flex-shrink-0 p-3 bg-white vl col-fluid"
          style={{ width: "280px", marginRight: "50px" }}
          id="collapseExample"
        >
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <span className="fs-5 fw-semibold">{userData.name}</span>
          </a>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                Home
              </button>
              <div className="collapse show" id="home-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Updates
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Reports
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Lead Management
              </button>
              <div className="collapse" id="dashboard-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <NavLink className="link-dark rounded" end to="/emp_leads">
                      All Leads
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="link-dark rounded" end to="/addlead">
                      Add Lead
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink className="link-dark rounded" end to="/excelleads">
                      Add Bulk Lead
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </li>
            {/* <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#orders-collapse"
                aria-expanded="false"
              >
                Orders
              </button>
              <div className="collapse" id="orders-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      New
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Processed
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Shipped
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Returned
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="border-top my-3"></li>
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#account-collapse"
                aria-expanded="false"
              >
                Account
              </button>
              <div className="collapse" id="account-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      New...
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{userData.name}</strong>
            </a>
            <ul
              className="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser2"
            >
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="nav-item">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;

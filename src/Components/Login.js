import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [phone, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ phone, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ phone, pwd, roles, accessToken });
      setPhone("");
      setPwd("");

      if (roles.includes(1989)) {
        var from = "/admin";
      } else {
        var from = "/";
      }

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <Navbar />

      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}></div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative d-flex aligns-items-center justify-content-center">
              <div className="card bg-glass ">
                <p
                  ref={errRef}
                  classNameName={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h1 style={{ textAlign: "center", color: "black" }}>Sign In</h1>
                <div className="card-body px-4 py-5 px-md-5 ">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xs-3 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example1">
                            Phone no
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-3 mb-4">
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                      </div>
                    </div>

                    <button
                      // type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign in
                    </button>

                    <div classNameName="persistCheck">
                      <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                      />
                      <label htmlFor="persist">Trust This Device</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

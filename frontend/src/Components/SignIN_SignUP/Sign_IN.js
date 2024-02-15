import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./StyleSignIN.css";

function Sign_IN() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessage] = useState("");
  const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
  const [messagesforget, setMessageForget] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        message.success(response.data.message);

        const { accessToken, refreshToken, role } = response.data;

        // Set cookies for tokens
        document.cookie = `accessToken=${accessToken}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/`;
        localStorage.setItem("role", role);
        localStorage.setItem("email", response.data.email);
        // Set axios default headers with the accessToken and refreshToken
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        axios.defaults.headers.common["Refresh-Token"] = refreshToken;

        navigate("/AdminDash");
      } else if (response.status === 401) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
      return response.data;
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/forget-password",
        {
          email,
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setForgetPasswordMode(false);
        setMessageForget("");
      }
    } catch (error) {
      setMessageForget(error.response.data.message);
      setTimeout(() => setMessageForget(""), 3000);
    }
  };

  const closeModal = () => {
    setForgetPasswordMode(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    }
  };

  return (
    <body className="bodySign">
      <div>
        <div className="wrapperlog">
          <form onSubmit={handleSignIn}>
            <h1>Sign IN</h1>
            <div className="input-boxlog">
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </div>
            </div>
            <div className="input-boxlog">
              <div className="input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i>
                  <FontAwesomeIcon icon={faLock} />
                </i>{" "}
                <i onClick={() => togglePasswordVisibility("password")}>
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    id="togglePasswordSignIN"
                  />
                </i>
              </div>
            </div>
            <p id="messageSignIN">{messages}</p>
            <label className="labelforget">
              <p>
                <span
                  onClick={() => setForgetPasswordMode(true)}
                  className="linkforget"
                >
                  Forget Password
                </span>
              </p>
            </label>
            <button type="submit" className="btnR">
              Login
            </button>
            <label htmlFor="">
              <p>
                Don't have an account?
                <Link to="/signup" className="link">
                  <span>Go to SignUP</span>
                </Link>
              </p>
            </label>
          </form>
        </div>
        {forgetPasswordMode && (
          <div id="id01" className="modal">
            <form
              id="resetFrom"
              className="modal-content animate"
              onSubmit={handleForgetPassword}
            >
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="imgcontainer">
                <h1>Reset Password</h1>
              </div>
              <div className="contadd">
                <div className="form-row">
                  <div className="password-container">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sub-button">
                  <input type="submit" value="Forget Password" />
                </div>
              </div>
              <p id="forgetmessage">{messagesforget}</p>
            </form>
          </div>
        )}
      </div>
    </body>
  );
}

export default Sign_IN;

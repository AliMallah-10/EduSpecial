import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faHandHoldingDroplet,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./StyleSignUp.css";

function Sign_UP() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          firstname: firstName,
          lastname: lastName,
          email,
          bloodType,
          password,
          confirmPassword,
        }
      );

      // Check the HTTP status code to determine success or error
      if (response.status === 201) {
        message.success("User registered successfully");
        navigate("/signin");
        // Set the state to redirect to the login page
      } else if (response.status === 400) {
        setMessage(response.data.message);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
      
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSignUp}>
        <h1>Sign UP</h1>
        <div className="input-box">
          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
        </div>
        <div className="input-box">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i>
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
          </div>
          <div className="input-field">
            <select
              name="blood"
              id="bloodst"
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">Choose Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <i>
              <FontAwesomeIcon icon={faHandHoldingDroplet} />
            </i>
          </div>
        </div>
        <div className="input-box">
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i>
              <FontAwesomeIcon icon={faLock} />
            </i>
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i>
              <FontAwesomeIcon icon={faLock} />
            </i>
          </div>
        </div>
        <p id="messageSignUP">{messages}</p>
        <button type="submit" className="btnR">
          Register
        </button>
        <label htmlFor="">
          <p>
            Already have an account?
            <Link to="/signin" className="link">
              Go to Login
            </Link>
          </p>
        </label>
      </form>
    </div>
  );
}

export default Sign_UP;

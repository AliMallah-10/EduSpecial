import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faHandHoldingDroplet, faLock } from "@fortawesome/free-solid-svg-icons";
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

      if (response.status === 201) {
        message.success("User registered successfully");
        navigate("/signin");
      } else if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div className="body-signup flex justify-center items-center min-h-screen bg-cover bg-center">



      <div className="w-full md:max-w-xl bg-opacity-10 border border-white bg-white bg-blur rounded-lg text-white p-8 shadow-lg">
        
        <form onSubmit={handleSignUp}>
          <h1 className="text-center text-3xl mb-8">Sign UP</h1>

          <div className="flex flex-wrap mb-4">
            {/* first name */}
            <div className="w-full md:w-1/2 pr-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
                />
                <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

            {/* last name */}
            <div className="w-full md:w-1/2 pl-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
                />
                <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

          </div>



          <div className="flex flex-wrap mb-4">
            {/* email */}
            <div className="w-full md:w-1/2 pr-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
                />
                <FontAwesomeIcon icon={faEnvelope} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

            {/* blood type */}
            <div className="w-full md:w-1/2 pl-2">
              <div className="relative flex items-center">
                <select
                  name="blood"
                  id="bloodst"
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
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
                <FontAwesomeIcon icon={faHandHoldingDroplet} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

          </div>



          <div className="flex flex-wrap mb-4">
            {/* password */}
            <div className="w-full md:w-1/2 pr-2">
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
                />
                <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

            {/* confirm password */}
            <div className="w-full md:w-1/2 pl-2">
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-4 py-2 text-white pl-10" // Added pl-10 for left padding
                />
                <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white" />
              </div>
            </div>

          </div>


          <p id="messageSignUP" className="mb-4 text-green-500">{messages}</p>
          <button type="submit" className="btnR w-full py-2 rounded-lg bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition duration-300">Register</button>
          <label htmlFor="" className="block text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="link text-green-500 hover:text-green-600">Go to Login</Link>
            </p>
          </label>
        </form>

      </div>
    </div>
  );
}

export default Sign_UP;

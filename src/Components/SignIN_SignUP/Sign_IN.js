import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
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
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState(""); // Separate state variable for forget password email
  const [messagesforget, setMessageForget] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/AdminDash");
      } else if (response.status === 401) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
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
          email: forgetPasswordEmail, // Use separate state variable for forget password email
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

  return (
    <div className="body-signin flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("../../Assets/images/signupBack.jpg")' }}>
     
      {/* login */}
      <div className="wrapperlog bg-opacity-10 border border-white bg-white bg-blur rounded-lg text-white p-8 shadow-lg max-w-6xl">

        <form onSubmit={handleSignIn}>
          <h1 className="text-center text-4xl mb-8">Sign IN</h1>
          {/* email input */}
          <div className="input-boxlog mb-4">
            <div className="input-field relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-12 py-2 text-white" // Increase px value for padding
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xl" />
            </div>
          </div>
            {/*  password input */}
          <div className="input-boxlog mb-4">
            <div className="input-field relative">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent border-2 border-white outline-none rounded-lg px-12 py-2 text-white" // Increase px value for padding
              />
              <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xl" />
            </div>
          </div>

          <p id="messageSignIN" className="text-center mb-4">{messages}</p>
          <label className="labelforget flex justify-end mb-4">
            <p>
              <span onClick={() => setForgetPasswordMode(true)} className="linkforget cursor-pointer">Forget Password</span>
            </p>
          </label>
          <button type="submit" className="btnR w-full py-2 rounded-lg bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition duration-300">Login</button>
          <label htmlFor="" className="block text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="link text-green-500 hover:text-green-600">Go to SignUP</Link>
            </p>
          </label>
        </form>
      </div>

      {/* forget password */}
      {forgetPasswordMode && (
        <div id="id01" className="modal fixed inset-0 flex items-center justify-center">
          <form id="resetFrom" className="modal-content animate bg-white p-8 rounded-lg shadow-lg" onSubmit={handleForgetPassword}>
            <span className="close absolute top-2 right-2 cursor-pointer" onClick={closeModal}>&times;</span>
            <div className="imgcontainer mb-8">
              <h1 className="text-center text-4xl">Reset Password</h1>
            </div>
            <div className="contadd">
              <div className="form-row mb-4">
                <div className="password-container w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setForgetPasswordEmail(e.target.value)} // Use separate state variable for forget password email
                    className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg py-2 px-4 outline-none focus:border-green-500"
                  />
                </div>
              </div>
              <div className="sub-button">
                <input type="submit" value="Forget Password" className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 cursor-pointer" />
              </div>
            </div>
            <p id="forgetmessage" className="text-center mt-4">{messagesforget}</p>
          </form>
        </div>
      )}
      
    </div>
  );
}

export default Sign_IN;

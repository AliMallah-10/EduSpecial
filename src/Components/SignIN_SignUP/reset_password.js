import React, { useState } from "react";
import axios from "axios";
import "./resetStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const { userId, token } = useParams();
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Extract userId and token from the URL or wherever you have them
      // const userId = "user_id"; // Replace with the actual user ID
      // const token = "reset_token"; // Replace with the actual reset token

      // Make an API request to reset the password
      const response = await axios.post(
        `http://localhost:3000/users/reset-password/${userId}/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      setResetMessage(error.response.data.error);
      setTimeout(() => setResetMessage(""), 3000);
    }
  };

  return (
    <div>
      <div id="id01" className="modal">
        <form
          id="resetFrom"
          className="modal-content animate"
          onSubmit={handleResetPassword}
          method="post"
        >
          <div className="imgcontainer">
            <h1>Reset Password</h1>
          </div>
          <div className="contadd">
            <div className="form-row">
              <div className="password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i onClick={() => togglePasswordVisibility("password")}>
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    id="togglePassword"
                  />
                </i>
              </div>
            </div>
            <div className="form-row">
              <div className="password-container">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirm_password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i onClick={() => togglePasswordVisibility("confirmPassword")}>
                  <FontAwesomeIcon
                    icon={confirmPasswordVisible ? faEyeSlash : faEye}
                    id="toggleConfirmPassword"
                  />
                </i>
              </div>
            </div>
            <div className="sub-button">
              <input type="submit" value="Reset Password" />
            </div>
          </div>
          <p
            id="Resetmessage"
            style={{ color: "white", marginTop: 10, textAlign: "center" }}
          >
            {resetMessage}
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

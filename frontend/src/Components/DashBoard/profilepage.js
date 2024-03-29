import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
const ProfilePage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );
  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || "Admin Name"
  );
  const [adminMajor, setAdminMajor] = useState(
    localStorage.getItem("adminMajor") || "Major: Computer Science"
  );

  useEffect(() => {
    // Update localStorage when adminName, adminMajor, or profileImage changes
    localStorage.setItem("adminName", adminName);
    localStorage.setItem("adminMajor", adminMajor);
    localStorage.setItem("profileImage", profileImage);
    // Get user's email from localStorage (assuming you saved it during login)
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    }
  }, [adminName, adminMajor, profileImage]);

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const handleMajorChange = (event) => {
    setAdminMajor(event.target.value);
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Verify old password
      const oldPasswordValid = await axios.post(
        `http://localhost:3000/users/verify-password`,
        {
          email: userEmail,
          password: oldPassword,
        }
      );

      if (!oldPasswordValid.data.valid) {
        setErrorMessage("Incorrect old password");
        return;
      }

      // Proceed with password update
      const response = await axios.put(
        `http://localhost:3000/users/updateuserbyemail/${userEmail}`,
        {
          password: newPassword,
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
      } else {
        setErrorMessage(
          response.data.error ||
            response.data.message ||
            "Failed to update password."
        );
        setTimeout(() => setErrorMessage(""), 3000);
      }
      setErrorMessage("");
      // Reset password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      handleToggleChangePassword();
    } catch (error) {
      setErrorMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to update password"
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <p className="mb-10 text-center text-black-500 font-semibold text-4xl">
        Profile Page
      </p>
      <label htmlFor="imageInput" className="cursor-pointer mb-4">
        <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden relative">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-600">Upload Image</span>
            </div>
          )}
        </div>
        <input
          id="imageInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>

      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-semibold mr-2">{adminName}</h2>
          <p className="text-white">{adminMajor}</p>
        </div>
        <div className="mt-2">
          <input
            type="text"
            className="border border-gray-300 rounded py-2 px-2 w-64"
            placeholder="Change Admin Name"
            value={adminName}
            onChange={handleNameChange}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            className="border border-gray-300 rounded py-2 px-2 w-64"
            placeholder="Change Major"
            value={adminMajor}
            onChange={handleMajorChange}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={handleToggleChangePassword}
      >
        Change Password
      </button>

      {showChangePassword && (
        <form className="mt-8 w-64 mx-auto">
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-white font-bold mb-2"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-white font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-white font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleToggleChangePassword}
            >
              Cancel
            </button>
          </div>
          <p className="mt-10 text-center text-red-500 font-semibold text-1xl">
            {errorMessage}
          </p>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;

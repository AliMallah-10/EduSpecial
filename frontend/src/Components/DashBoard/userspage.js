import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/usestyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faXmark,
  faCircleExclamation,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
function UsersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [testUsers, setTestUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessage] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null); // State to store the ID of the user to be deleted
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bloodType: "",
    role: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
  });
  // ! Fetch all users on Search -----------------------------------------
  // const [filteredUsers, setFilteredUsers] = useState([]);

  // useEffect(() => {
  //   // Fetch users data from API
  //   axios
  //     .get("http://localhost:3000/users/Getusers")
  //     .then((response) => {
  //       const filtered = response.data.filter((user) =>
  //         user.email.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //       setFilteredUsers(filtered);

  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // }, [searchQuery]);
  // !  Show Result search -------------------------------------------------
  const handleAddUserClick = () => {
    setShowAddForm(true);
    setShowUpdateForm(false);
  };
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };
  const handleUpdateClick = (user) => {
    setSelectedUser(user); // Set the selected user for updating
    setShowAddForm(false);
    setShowUpdateForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowConfirmation(false);
  };
  // ! ADD form user ----------------------------------------------------------------
  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (newUser.password !== newUser.confirmPassword) {
        return setMessage("Passwords do not match");
      }

      const response = await axios.post(
        "http://localhost:3000/users/register",
        newUser
      );

      if (response.status === 201) {
        message.success(response.data.message);
        setShowAddForm(false);
      } else {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }

      // Reset password and confirm password fields
      setNewUser((prevUser) => ({
        ...prevUser,
        password: "",
        confirmPassword: "",
      }));

      // Fetch users again to update the list
      fetchUsers();
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
      console.error("Error adding user:", error);
    }
  };
  // ! update user 0-===================================================
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/users/updateuserbyid/${selectedUser._id}`,
        selectedUser
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setShowUpdateForm(false);
      } else {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }

      // Fetch users again to update the list
      fetchUsers();
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteClick = (userId) => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowConfirmation(true);
    // Ensure userId is valid before setting deleteUserId
    if (userId) {
      setDeleteUserId(userId);
    } else {
      message.error("Invalid user ID");
    }
  };
  // ! delete user ---------------------------------------------

  const handleDeleteConfirmation = async () => {
    try {
      // Perform delete operation here
      // For example:
      const response = await axios.delete(
        `http://localhost:3000/users/deleteuserbyid/${deleteUserId}`
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setShowAddForm(false);
      } else {
        setMessage(response.data.message);
        setMessage(response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
      setShowConfirmation(false);
      fetchUsers();
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
      console.error("Error adding user:", error);
      console.error("Error deleting user:", error);
    }
  };

  // ! get all users -----------------------------------
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/Getusers");

      setTestUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // Return an empty string if dateTimeString is falsy
    const parsedDate = Date.parse(dateTimeString);
    if (isNaN(parsedDate)) return ""; // Return an empty string if parsing fails
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(parsedDate)
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  // todo end the get users-------------------------------------

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">User Management</h1>

      <div className="flex justify-end mb-8">
        <button
          type="button"
          className="buttonAddUser"
          onClick={handleAddUserClick}
        >
          <span className="button__text">Add User</span>
          <span className="button__icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        {isLoading ? (
          <p className="loadS">
            <div class="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </p>
        ) : (
          <table className="table-fixed min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-4 px-2 border-b">ID</th>
                <th className="py-3 px-2 border-b">Role</th>
                <th className="py-3 px-2 border-b">First Name</th>
                <th className="py-3 px-2 border-b">Last Name</th>
                <th className="py-3 px-2 border-b">Blood Type</th>
                <th className="py-3 px-2 border-b">Email</th>
                <th className="py-3 px-2 border-b">Timestamps</th>
                <th className="py-3 px-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testUsers && testUsers.length > 0 ? (
                testUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={index % 2 === 0 ? "bg-blue-500" : "bg-blue-400"}
                  >
                    {/* <td className="py-5 px-4 border-b">{index + 1}</td> */}
                    <td className="py-5 px-4 border-b">{user._id}</td>
                    <td className="py-5 px-2 border-b">{user.role}</td>
                    <td className="py-2 px-2 border-b">{user.firstname}</td>
                    <td className="py-2 px-2 border-b">{user.lastname}</td>
                    <td className="py-2 px-2 border-b">{user.bloodType}</td>
                    <td className="py-5 px-2 border-b">{user.email}</td>
                    <td className="py-2 px-2 border-b">
                      {formatDateTime(user.updatedAt)}
                    </td>
                    <td className="py-2 px-6 border-b">
                      <button
                        className="Updatebtn"
                        onClick={() => handleUpdateClick(user)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="DeleteBtn"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8 m-auto">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAddFormSubmit} className="form">
          <p className="title">Add User</p>
          <p className="message">Add a new user and fill all the fields.</p>
          <div className="fexIn">
            <label>
              <input
                required
                type="text"
                className="input"
                name="firstname"
                value={newUser.firstname}
                onChange={handleChange}
              />
              <span>First Name</span>
            </label>
            <label>
              <input
                required
                type="text"
                className="input"
                name="lastname"
                value={newUser.lastname}
                onChange={handleChange}
              />
              <span>Last Name</span>
            </label>
          </div>
          <label>
            <input
              required
              type="email"
              className="input"
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          <div className="fexIn">
            <label>
              <select
                name="bloodType"
                value={newUser.bloodType}
                onChange={handleChange}
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
            </label>
            <label>
              <select name="role" value={newUser.role} onChange={handleChange}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </label>
          </div>
          <div className="fexIn">
            <label>
              <input
                required
                type={passwordVisible ? "text" : "password"}
                className="input"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
              <span>Password</span>
              <i onClick={() => togglePasswordVisibility("password")}>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  id="togglePassword"
                />
              </i>
            </label>
            <label>
              <input
                required
                type={confirmPasswordVisible ? "text" : "password"}
                className="input"
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleChange}
              />
              <span>Confirm Password</span>
              <i onClick={() => togglePasswordVisibility("confirmPassword")}>
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  id="toggleConfirmPassword"
                />
              </i>
            </label>
          </div>

          <div className="btnsFormuser">
            <button type="submit" className="submit">
              Add User
            </button>
            <button
              type="button"
              className="Cancelbtn"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
          <p className="messageadduser">{messages}</p>
        </form>
      )}

      {showUpdateForm && (
        <form onSubmit={handleUpdateFormSubmit} className="form">
          <p className="title">Update User</p>
          <p className="message">Update the user details below.</p>
          <div className="fexIn">
            <label>
              <input
                required
                placeholder
                type="text"
                className="input"
                value={selectedUser.firstname}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstname: e.target.value,
                  })
                }
              />
              <span>First Name</span>
            </label>
            <label>
              <input
                required
                placeholder
                type="text"
                className="input"
                value={selectedUser.lastname}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastname: e.target.value })
                }
              />
              <span>Last Name</span>
            </label>
          </div>
          <label>
            <input
              required
              placeholder
              type="email"
              className="input"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <span>Email</span>
          </label>
          <div className="fexIn">
            <label>
              <select
                name="blood"
                value={selectedUser.bloodType}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    bloodType: e.target.value,
                  })
                }
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
            </label>
            <label>
              <select
                name="role"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </label>
          </div>

          <div className="btnsFormuser">
            <button type="submit" className="submit">
              Update User
            </button>
            <button
              type="button"
              className="Cancelbtn"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
          <p className="messageadduser"></p>
        </form>
      )}
      {showConfirmation && (
        <div id="id01" className="modalC">
          <form className="modal-contentC animate">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <div className="confD">
              <i>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </i>
              <p>Are you sure you want to delete this user?</p>
              <div className="btnsFormuser">
                <button
                  type="button"
                  className="submit"
                  onClick={handleDeleteConfirmation}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="Cancelbtn"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
              <p id="addmessage">{messages}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UsersPage;

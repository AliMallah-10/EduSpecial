import React, { useState } from "react";
import "./Styles/usestyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const testUsers = [
  {
    _id: "1",
    role: "admin",
    firstname: "John",
    lastname: "Doe",
    bloodType: "O+",
    email: "john.doe@example.com",
    createdAt: "2024-02-02T12:00:00Z", // Replace with an actual timestamp
  },
  {
    _id: "2",
    role: "user",
    firstname: "Jane",
    lastname: "Smith",
    bloodType: "A-",
    email: "jane.smith@example.com",
    createdAt: "2024-02-01T10:30:00Z", // Replace with an actual timestamp
  },
  {
    _id: "2",
    role: "user",
    firstname: "Jane",
    lastname: "Smith",
    bloodType: "A-",
    email: "jane.smith@example.com",
    createdAt: "2024-02-01T10:30:00Z", // Replace with an actual timestamp
  },
  {
    _id: "2",
    role: "user",
    firstname: "Jane",
    lastname: "Smith",
    bloodType: "A-",
    email: "jane.smith@example.com",
    createdAt: "2024-02-01T10:30:00Z", // Replace with an actual timestamp
  },
  // Add more test users as needed
];

function formatDateTime(dateTimeString) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(
    new Date(dateTimeString)
  );
}

function UsersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleAddUserClick = () => {
    setShowAddForm(true);
    setShowUpdateForm(false);
  };

  const handleUpdateClick = () => {
    setShowAddForm(false);
    setShowUpdateForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowConfirmation(false);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Handle logic for adding a new user
    setShowAddForm(false);
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    // Handle logic for updating the selected user
    setShowUpdateForm(false);
  };
  const handleDeleteClick = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowConfirmation(true);
  };
  const handleDeleteConfirmation = () => {
    // Handle logic for deleting the selected user
    setShowConfirmation(false);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

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
            {testUsers.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-green-200" : "bg-green-400"}
              >
                <td className="py-5 px-4 border-b">{user._id}</td>
                <td className="py-5 px-2 border-b">{user.role}</td>
                <td className="py-2 px-2 border-b">{user.firstname}</td>
                <td className="py-2 px-2 border-b">{user.lastname}</td>
                <td className="py-2 px-2 border-b">{user.bloodType}</td>
                <td className="py-5 px-2 border-b">{user.email}</td>
                <td className="py-2 px-2 border-b">
                  {formatDateTime(user.createdAt)}
                </td>
                <td className="py-2 px-6 border-b">
                  <button className="Updatebtn" onClick={handleUpdateClick}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="DeleteBtn" onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddFormSubmit} className="form">
          <p className="title">Add User</p>
          <p className="message">Add a new user and fill all the fields.</p>
          <div className="fexIn">
            <label>
              <input required placeholder type="text" className="input" />
              <span>First Name</span>
            </label>
            <label>
              <input required placeholder type="text" className="input" />
              <span>Last Name</span>
            </label>
          </div>
          <label>
            <input required placeholder type="email" className="input" />
            <span>Email</span>
          </label>
          <div className="fexIn">
            <label>
              <select name="blood">
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
              <select name="role">
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
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
          <p className="messageadduser"></p>
        </form>
      )}
      {showUpdateForm && (
        <form onSubmit={handleUpdateFormSubmit} className="form">
          <p className="title">Update User</p>
          <p className="message">Update the user details below.</p>
          <div className="fexIn">
            <label>
              <input required placeholder type="text" className="input" />
              <span>First Name</span>
            </label>
            <label>
              <input required placeholder type="text" className="input" />
              <span>Last Name</span>
            </label>
          </div>
          <label>
            <input required placeholder type="email" className="input" />
            <span>Email</span>
          </label>
          <div className="fexIn">
            <label>
              <select name="blood">
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
              <select name="role">
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
              <p id="addmessage"></p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UsersPage;

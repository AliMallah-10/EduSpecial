import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faUserPen,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { message } from "antd";
import "./Styles/enrollstyle.css";

function EnrollmentPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [updateSelectedUserId, setUpdateSelectedUserId] = useState("");
  const [updateSelectedProgramId, setUpdateSelectedProgramId] = useState("");

  useEffect(() => {
    fetchRegistrations();
    fetchUsers();
    fetchPrograms();
  }, []);

  // Fetch registrations data
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/registerProgam/registrations"
      );
     
      setRegistrations(response.data);
      setIsLoading(false);
    } catch (error) {
    
      alert(error.response.data.error);
      console.error("Error fetching registrations:", error);
    }
  };

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/Getusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch programs data
  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/program/getAllprograms"
      );
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  // Handle enrollment
  const handleEnrollment = async () => {
    if (!selectedUserId || !selectedProgramId) {
      setMessageText("Please select a user and a program to enroll.");
      setTimeout(() => setMessageText(""), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/registerProgam/ADDregistrations",
        {
          userId: selectedUserId,
          programId: selectedProgramId,
        }
      );
      if (response.status === 201) {
        message.success(response.data.message);
        fetchRegistrations();
        // Clear the selected user and program IDs
        setSelectedUserId("");
        setSelectedProgramId("");
      } else {
        setMessageText(
          response.data.error ||
            response.data.message ||
            "Failed to Enroll. Please try again."
        );
        setTimeout(() => setMessageText(""), 3000);
      }
    } catch (error) {
      setMessageText(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to Enroll. Please try again."
      );
      setTimeout(() => setMessageText(""), 3000);
    }
  };

  // Handle delete click
  const handleDeleteClick = (registrationId) => {
    setRegistrationToDelete(registrationId);
    setShowConfirmation(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registerProgam/deleteregistrations/${registrationToDelete}`
      );
      if (response.status === 200) {
        message.success(response.data.message);
        fetchRegistrations();
        setShowConfirmation(false);
      } else {
        setMessageText(
          response.data.error ||
            response.data.message ||
            "Failed to delete. Please try again."
        );
        setTimeout(() => setMessageText(""), 3000);
      }
    } catch (error) {
      setMessageText(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to delete. Please try again."
      );
      setTimeout(() => setMessageText(""), 3000);
    }
  };

  // Handle update click
  // Handle update click
  // Handle update click
  const handleUpdateClick = (registrationId) => {
    const registration = registrations.find(
      (registration) => registration._id === registrationId
    );
    setSelectedRegistration(registration);
    setUpdateSelectedUserId(registration.userId); // Set the selected user ID
    setUpdateSelectedProgramId(registration.programId); // Set the selected program ID
    setShowUpdate(true);
  };

  // Handle update submit
  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registerProgam/updateregistrations/${selectedRegistration._id}`,
        {
          userId: updateSelectedUserId,
          programId: updateSelectedProgramId,
        }
      );
      if (response.status === 200) {
        message.success(response.data.message);
        fetchRegistrations();
        // Clear the selected user and program IDs
        setUpdateSelectedUserId("");
        setUpdateSelectedProgramId("");
        setShowUpdate(false);
      } else {
        message.error(response.data.message);
        message.error(response.data.error);
      }
    } catch (error) {
      message.error(error.response.data.message || error.response.data.error);
    }
  };
  // Handle cancel click
  const handleCancelClick = () => {
    setShowConfirmation(false);
    setShowUpdate(false);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgb(32, 86, 212)",
      color: "white", // Change background color
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#062262",
    }),
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-white">Enrollment Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* User Select */}
        <div>
          <label
            htmlFor="userSelect"
            className="block text-sm font-medium text-white mb-1"
          >
            Select User:
          </label>
          <Select
            id="userSelect"
            options={users.map((user) => ({
              value: user._id,
              label: `${user.firstname} ${user.lastname}`,
            }))}
            value={
              selectedUserId
                ? {
                    value: selectedUserId,
                    label:
                      users.find((user) => user._id === selectedUserId)
                        ?.firstname +
                      " " +
                      users.find((user) => user._id === selectedUserId)
                        ?.lastname,
                  }
                : null
            }
            onChange={(selectedOption) =>
              setSelectedUserId(selectedOption ? selectedOption.value : "")
            }
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>
        {/* Program Select */}
        <div>
          <label
            htmlFor="programSelect"
            className="block text-sm font-medium text-white mb-1"
          >
            Select Program:
          </label>
          <Select
            id="programSelect"
            options={programs.map((program) => ({
              value: program._id,
              label: program.name,
            }))}
            value={
              selectedProgramId
                ? {
                    value: selectedProgramId,
                    label: programs.find(
                      (program) => program._id === selectedProgramId
                    )?.name,
                  }
                : null
            }
            onChange={(selectedOption) =>
              setSelectedProgramId(selectedOption ? selectedOption.value : "")
            }
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>
      </div>
      {/* Add New Button */}
      <button
        onClick={handleEnrollment}
        title="Enroll"
        className="group cursor-pointer outline-none hover:rotate-90 duration-300 rounded-full p-3 text-center mt-10 border-none bg-blue-400 hover:bg-blue-700"
      >
        <i className="text-lg text-white">
          <FontAwesomeIcon icon={faPlus} />
        </i>
      </button>

      {/* Message */}
      {messageText && <p className="text-red-500 mt-2">{messageText}</p>}

      {/* Loading Spinner */}
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
        // Registrations List
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="rounded shadow-lg p-4 bg-blue-500 transform transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2 bg-blue-200 h-2/5 px-2 rounded">
                <h2 className="text-xl font-bold">{registration.userName}</h2>
                <p className="text-gray-600">{registration.email}</p>
              </div>
              <div className="mb-8">
                <div>
                  <p className="text-blue-900 mb-3 text-base">
                    Program: {registration.programName}
                  </p>
                  <div className="flex justify-around items-center">
                    <p className="text-sm text-blue-200">
                      Registration Date:{" "}
                      {formatDate(registration.registrationDate)}
                    </p>
                    <p className="text-sm text-blue-200">
                      Last Updated: {formatDate(registration.UpdateAt)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <i
                    className="text-lg text-blue-900 hover:text-blue-700"
                    onClick={() => handleUpdateClick(registration._id)}
                  >
                    <FontAwesomeIcon icon={faUserPen} />
                  </i>
                  <i
                    className="text-lg text-white hover:text-red-500"
                    onClick={() => handleDeleteClick(registration._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </i>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                  onClick={handleConfirmDelete}
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
            </div>
            {messageText && <p className="text-red-500 mt-2">{messageText}</p>}
          </form>
        </div>
      )}
      {showUpdate && (
        <div id="id01" className="modalC">
          <form className="modal-contentC animate">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <div className="confD">
              <h1 className="mb-10">Update User Information:</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* User Select */}
                <div>
                  <label
                    htmlFor="UpdateuserSelect"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Select User:
                  </label>
                  <Select
                    id="UpdateuserSelect"
                    options={users.map((user) => ({
                      value: user._id,
                      label: `${user.firstname} ${user.lastname}`,
                    }))}
                    value={
                      updateSelectedUserId
                        ? {
                            value: updateSelectedUserId,
                            label:
                              users.find(
                                (user) => user._id === updateSelectedUserId
                              )?.firstname +
                              " " +
                              users.find(
                                (user) => user._id === updateSelectedUserId
                              )?.lastname,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      setUpdateSelectedUserId(
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                {/* Program Select */}
                <div>
                  <label
                    htmlFor="UpdateprogramSelect"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Select Program:
                  </label>
                  <Select
                    id="UpdateprogramSelect"
                    options={programs.map((program) => ({
                      value: program._id,
                      label: program.name,
                    }))}
                    value={
                      updateSelectedProgramId
                        ? {
                            value: updateSelectedProgramId,
                            label: programs.find(
                              (program) =>
                                program._id === updateSelectedProgramId
                            )?.name,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      setUpdateSelectedProgramId(
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <button
                type="button"
                className="submit"
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
              <button
                type="button"
                className="Cancelbtn"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EnrollmentPage;

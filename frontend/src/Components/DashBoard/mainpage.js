import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import {
  faBriefcase,
  faPerson,
  faCircleDollarToSlot,
  faLayerGroup,
  faPlus,
  faEnvelope,
  faTrash,
  faPenToSquare,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./Styles/dashStyle.css";
import "./Styles/FormDashStyle.css";
import axios from "axios";
function Mainpage() {
  const [teams, setTeams] = useState([]);
  const [addForm2, setaddForm2] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [messages, setMessage] = useState("");
  // !!!!!! HANDLE ERROR MESSAGE FOR ADD TEAM AND UPDATE TEAM FUNCTIONALITY !!!!!
  const [events, setEvents] = useState([]);
  const [addEventFormVisible, setAddEventFormVisible] = useState(false);
  const [editEventFormVisible, setEditEventFormVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [nameevents, setEditEventName] = useState("");
  const [eventDate, setEditEventDate] = useState("");
  const [description, setEditEventDescription] = useState("");
  const [imageevents, setEditEventImage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  // ! get team 000000000000000000000000000000000000000000000
  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/team/Allemployees"
      );

      setTeams(response.data);
    } catch (error) {
      alert(`Error: ${error}`);

      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  // todo end get team 000000000000000000000000000000000000000000000
  // ! get events  000000000000000000000000000000000000000000000
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/events/getallevents"
      );
      // Format the eventDate for each event
      const formattedEvents = response.data.map((event) => {
        // Extract just the date part from the datetime string
        const formattedDate = event.eventDate.split("T")[0];
        return {
          ...event,
          eventDate: formattedDate,
        };
      });

      // Set the formatted events to the state
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  // todo end get events  000000000000000000000000000000000000000000000
  const toggleForm1 = (id) => {
    setShowForm1(!showForm1);
    setSelectedTeamMember(id); // Set the selected team member ID

    // Populate form fields with selected team member data
    const selectedMember = teams.find((member) => member._id === id);
    if (selectedMember) {
      setName(selectedMember.name);
      setPosition(selectedMember.position);
      // You may need to adjust how you handle the image
      setImage(selectedMember.image);
    }
  };

  const toggleAddEventForm = () => {
    setAddEventFormVisible(!addEventFormVisible);
  };

  const toggleEventEditForm = (eventId) => {
    setEditEventFormVisible(!editEventFormVisible);
    setSelectedEventId(eventId);
    const selectedEvent = events.find((event) => event._id === eventId);
    if (selectedEvent) {
      setEditEventName(selectedEvent.nameevents);
      setEditEventDate(selectedEvent.eventDate); // Corrected the state name
      setEditEventDescription(selectedEvent.description);
      setEditEventImage(selectedEvent.imageevents);
    }
  };
  const toggleaddFormDelete = (eventId) => {
    setSelectedEventId(eventId); // Set the selected event ID
    setShowConfirmation(true);
  };

  const toggleaddForm4 = () => {
    setaddForm2(!addForm2);
  };
  const closeModal = () => {
    setShowForm1(false);
    setaddForm2(false);
    setShowConfirmation(false);
    setEditEventFormVisible(false);
    setAddEventFormVisible(false);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  // ! ADD events  000000000000000000000000000000000000000000000
  const handleAddEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nameevents", nameevents);
      formData.append("eventDate", eventDate);
      formData.append("description", description);
      formData.append("imageevents", imageevents);

      const response = await axios.post(
        "http://localhost:3000/events/addevent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        // Check if response.data exists before accessing its properties
        if (response.data) {
          message.success(response.data.message);
        } else {
          console.error("Response data is undefined or null");
        }
        fetchEvents();
        setAddEventFormVisible(false);
      }
    } catch (error) {
      // Check if error.response exists before accessing its properties
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        console.error("Error response or data is undefined or null:", error);
        setMessage("An error occurred while processing your request.");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // todo end ADD events  000000000000000000000000000000000000000000000
  // ! update ADD events  000000000000000000000000000000000000000000000
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nameevents", nameevents);
      formData.append("eventDate", eventDate);
      formData.append("description", description);
      formData.append("imageevents", imageevents);

      const response = await axios.put(
        `http://localhost:3000/events/updateevent/${selectedEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        message.success(response.data.message);
      }
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
      fetchEvents();
      setEditEventFormVisible(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // todo end update events  000000000000000000000000000000000000000000000
  // ! delete  events  000000000000000000000000000000000000000000000
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/events/deleteevent/${selectedEventId}`
      );

      if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setShowConfirmation(false);
        message.success(response.data.message);
      }

      fetchEvents();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
        setTimeout(() => setMessage(""), 3000);
      } else {
        console.error("Error:", error);
        message.error("An error occurred while processing your request.");
      }
    }
  };
  // todo end delete events  000000000000000000000000000000000000000000000
  // ! ADD team 000000000000000000000000000000000000000000000
  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      formData.append("image", image); // Assuming 'image' is the file input

      const response = await axios.post(
        "http://localhost:3000/team/ADDemployees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchTeams();
      setaddForm2(false);

      // Handle success response
      if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(""), 3000);
    }
  };
  // ! Delete team 000000000000000000000000000000000000000000000
  const handleDeleteTeamMember = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/team/deletemployeesbyid/${id}`
      );

      if (response.status === 400) {
        message.error(response.data.message);
      } else {
        message.success(response.data.message);
      }
      fetchTeams();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  // ! update team 000000000000000000000000000000000000000000000

  const handleUpdateTeamMember = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:3000/team/updateemployees/${selectedTeamMember}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchTeams();
      setShowForm1(false);

      // Handle success response
      if (response && response.data && response.data.message) {
        message.success(response.data.message);
      } else {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div>
      <div className="cards">
        <div className="card-single">
          <div>
            <h1>50</h1>
            <span>Customers</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faPerson} />
            </span>
          </div>
        </div>
        <div className="card-single">
          <div>
            <h1>100</h1>
            <span>Program</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
          </div>
        </div>
        <div className="card-single">
          <div>
            <h1>20</h1>
            <span>Donations</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
            </span>
          </div>
        </div>
        <div className="card-single">
          <div>
            <h1>25</h1>
            <span>Category</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          </div>
        </div>
      </div>
      <div className="recent-grid">
        {/* program part ------------------ */}
        <div className="programs">
          <div className="card">
            <div className="card-header">
              <h3>Recent Events</h3>
              <button onClick={toggleAddEventForm}>
                Add One
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </button>
            </div>
            {addEventFormVisible && (
              <div id="id01" className="modal">
                <form id="eventedit" className="modal-content animate">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="imgcontainer">
                    <h1>Add Events</h1>
                  </div>
                  <div className="contadd">
                    <div className="form-row">
                      <div className="input-container">
                        <input
                          type="file"
                          name="imageevents"
                          onChange={(e) => setEditEventImage(e.target.files[0])}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          name="nameevents"
                          placeholder="Event Name"
                          value={nameevents}
                          onChange={(e) => setEditEventName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="date"
                          name="eventDate"
                          value={eventDate}
                          onChange={(e) => setEditEventDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-container">
                        <textarea
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={description}
                          onChange={(e) =>
                            setEditEventDescription(e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="sub-button">
                      <input
                        type="submit"
                        value="ADD"
                        onClick={handleAddEventSubmit}
                      />
                    </div>
                  </div>
                  <p className="addmessage">{messages}</p>
                </form>
              </div>
            )}
            <div className="card-body">
              <div className="table-responsive">
                <table width={"100%"}>
                  <thead>
                    <tr>
                      <td>Event Name</td>
                      <td>Date</td>

                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through events array and render each event */}
                    {events.map((event) => (
                      <tr key={event._id}>
                        <td>{event.nameevents}</td>
                        <td>{event.eventDate}</td>
                        <td>
                          {/* Action buttons */}
                          <button
                            className="trash-btn"
                            onClick={() => toggleaddFormDelete(event._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => toggleEventEditForm(event._id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {editEventFormVisible && (
          <div id="id01" className="modal">
            <form id="eventedit" className="modal-content animate">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="imgcontainer">
                <h1>Edit Events</h1>
              </div>
              <div className="contadd">
                <div className="form-row">
                  <img
                    className="w-40 h-40 rounded-xl mt-10"
                    src={`http://localhost:3000/uploads/${imageevents}`}
                    alt="Team Member"
                  />
                  <div className="input-container">
                    <input
                      type="file"
                      name="imageevents"
                      onChange={(e) => setEditEventImage(e.target.files[0])}
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="nameevents"
                      placeholder="Program Name"
                      value={nameevents}
                      onChange={(e) => setEditEventName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="date"
                      name="eventDate"
                      value={eventDate} // Make sure eventDate is bound here
                      onChange={(e) => setEditEventDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setEditEventDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="sub-button">
                  <input
                    type="submit"
                    value="Update"
                    onClick={handleUpdateEvent}
                  />
                </div>
              </div>
              <p id="addmessage">{messages}</p>
            </form>
          </div>
        )}
        {showConfirmation && (
          <div id="id01" className="modalC">
            <form className="modal-contentC animate">
              <span className="close" onClick={closeModal}>
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
                    onClick={handleDeleteEvent}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="Cancelbtn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
                <p id="addmessage">{messages}</p>
              </div>
            </form>
          </div>
        )}
        {/* ! team part ----------------------------- */}
        <div className="customers">
          <div className="card">
            <div className="card-header">
              <h3>Team</h3>
              <button onClick={toggleaddForm4}>
                Add One
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </button>
            </div>
            {addForm2 && (
              <div id="id01" className="modal">
                <form
                  id="teamedit"
                  className="modal-content animate"
                  onSubmit={handleAddTeamSubmit}
                >
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="imgcontainer">
                    <h1>Add Team</h1>
                  </div>
                  <div className="contadd">
                    <div className="form-row">
                      <div className="input-container">
                        <input
                          type="file"
                          name="image"
                          required
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          name="position"
                          placeholder="Position"
                          required
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="sub-button">
                      <input type="submit" value="ADD" />
                    </div>
                  </div>
                  <p id="addTeamMessage">{messages}</p>
                </form>
              </div>
            )}
            <div className="card-body">
              {teams.map((team) => (
                <div key={team._id} className="team">
                  <div className="info">
                    <img
                      src={`http://localhost:3000/uploads/${team.image}`}
                      alt={team.name}
                      height={"40px"}
                      width={"40px"}
                    />
                    <div>
                      <h4>{team.name}</h4>
                      <small>{team.position}</small>
                      <div className="icons_Con">
                        <i>
                          <FontAwesomeIcon icon={faFacebook} />
                        </i>
                        <i>
                          <FontAwesomeIcon icon={faLinkedin} />
                        </i>
                        <i>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="contact">
                    <button
                      className="trash-btn"
                      onClick={() => handleDeleteTeamMember(team._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button class="Btn" onClick={() => toggleForm1(team._id)}>
                      Edit
                      <svg class="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showForm1 && (
              <div id="id01" className="modal">
                <form
                  id="teamedit"
                  className="modal-content animate"
                  onSubmit={handleUpdateTeamMember}
                >
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="imgcontainer">
                    {/* Display the image */}
                    <img
                      className="w-40 h-40 rounded-xl mt-10"
                      src={`http://localhost:3000/uploads/${image}`}
                      alt="Team Member"
                    />
                  </div>
                  <div className="contadd">
                    {/* Input fields for name and position */}
                    <div className="form-row">
                      <div className="input-container">
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          name="position"
                          placeholder="Position"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Submit button */}
                    <div className="sub-button">
                      <input type="submit" value="Edit" />
                    </div>
                  </div>
                  <p id="Teammessage">{messages}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;

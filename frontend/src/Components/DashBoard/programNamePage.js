import React, { useState } from "react";
import "./Styles/programStyle.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
function ProgramPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showADDForm, setShowADDForm] = useState(false);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };
  const handleADDClick = () => {
    setShowADDForm(true);
  };

  const handleCancelClick = () => {
    setShowUpdateForm(false);
    setShowADDForm(false);
  };
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };
  const handleDeleteConfirmation = () => {
    // Handle logic for deleting the selected user
    setShowConfirmation(false);
  };
  const handleUpdateProgram = (e) => {
    e.preventDefault();
    // Handle logic for updating the selected user
    setShowUpdateForm(false);
  };
  const handleADDProgram = (e) => {
    e.preventDefault();
    // Handle logic for updating the selected user
    setShowUpdateForm(false);
  };
  return (
    <div>
      <ul className="menuC">
        <li>
          <Link>
            <span>Item 1</span>
          </Link>
        </li>
        <li>
          <Link>
            <span>Item 2</span>
          </Link>
        </li>
        <li>
          <Link>
            <span>Item 3</span>
          </Link>
        </li>
        <li>
          <Link>
            <span>Item 4</span>
          </Link>
        </li>
        <li>
          <Link>
            <span>Item 5</span>
          </Link>
        </li>
        <li>
          <Link>
            <span>Item 6</span>
          </Link>
        </li>
      </ul>
      <div className="flex justify-end mt-8  mr-5">
        <button class="cssbuttons-io-button" onClick={handleADDClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
            ></path>
          </svg>
          <span>Add</span>
        </button>
      </div>

      <div class="dropdown">
        <button class="dropbtn">All Programs</button>
        <div class="dropdown-content">
          <a href="jhhj">Link 1</a>
          <a href="jh">Link 2</a>
          <a href="#hj">Link 3</a>
        </div>
      </div>

      <div className="cardsProgram">
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src={require("../../Assets/images/signupBack.jpg")}
              alt="Program images"
              className="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Tailwind card
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Total Users: <span>50</span>
            </p>
          </div>
          <div class="p-6 pt-0">
            <button className="btnReadMore" onClick={handleUpdateClick}>
              Read More
            </button>
            <button className="btnDeleteP" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src={require("../../Assets/images/signupBack.jpg")}
              alt="Program images"
              className="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Tailwind card
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Total Users: <span>50</span>
            </p>
          </div>
          <div class="p-6 pt-0">
            <button className="btnReadMore">Read More</button>
            <button className="btnDeleteP">Delete</button>
          </div>
        </div>
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src={require("../../Assets/images/signupBack.jpg")}
              alt="Program images"
              className="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Tailwind card
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Total Users: <span>50</span>
            </p>
          </div>
          <div class="p-6 pt-0 contbtn">
            <button className="btnReadMore">Read More</button>
            <button className="btnDeleteP">Delete</button>
          </div>
        </div>
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src={require("../../Assets/images/360_F_671522900_LY8PxuvWoTm4dq9pbHKEwMyaS7B4vCKK.jpg")}
              alt="Program images"
              className="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Tailwind card
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Total Users: <span>50</span>
            </p>
          </div>
          <div class="p-6 pt-0">
            <button className="btnReadMore">Read More</button>
            <button className="btnDeleteP">Delete</button>
          </div>
        </div>
      </div>
      {showUpdateForm && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <form onSubmit={handleUpdateProgram} className="formProgram">
              <p className="title">Update Program</p>
              <p className="message">Update the Program details below.</p>
              <div className="fexIn">
                <label>
                  <input required placeholder type="text" className="input" />
                  <span>Name</span>
                </label>
                <label>
                  <input required placeholder type="number" className="input" />
                  <span>Price</span>
                </label>
              </div>
              <div className="fexIn">
                <label>
                  <input
                    required
                    placeholder
                    type="file"
                    className="input"
                    name="image"
                  />
                </label>
                <label>
                  <input required placeholder type="number" className="input" />
                  <span>Count</span>
                </label>
              </div>

              <div className="fexIn">
                <label>
                  <select name="blood">
                    <option value="">Choose category</option>
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
              </div>
              <div className="fexIn">
                <label>
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Description"
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuser">
                <button type="submit" className="submit">
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
              <p className="messageadduser"></p>
            </form>
          </form>
        </div>
      )}
      {showADDForm && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <form onSubmit={handleADDProgram} className="formProgram">
              <p className="title">ADD Program</p>
              <p className="message">Enter the Program details below.</p>
              <div className="fexIn">
                <label>
                  <input required placeholder type="text" className="input" />
                  <span>Name</span>
                </label>
                <label>
                  <input required placeholder type="number" className="input" />
                  <span>Price</span>
                </label>
              </div>
              <div className="fexIn">
                <label>
                  <input
                    required
                    placeholder
                    type="file"
                    className="input"
                    name="image"
                  />
                </label>
                <label>
                  <input required placeholder type="number" className="input" />
                  <span>Count</span>
                </label>
              </div>

              <div className="fexIn">
                <label>
                  <select name="blood">
                    <option value="">Choose category</option>
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
              </div>
              <div className="fexIn">
                <label>
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Description"
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuser">
                <button type="submit" className="submit">
                  ADD
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
          </form>
        </div>
      )}
      {showConfirmation && (
        <div id="id01" className="modalC">
          <form className="modal-contentC animate">
            <span className="close" onClick={handleDeleteConfirmation}>
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
                  onClick={handleDeleteClick}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="Cancelbtn"
                  onClick={handleDeleteConfirmation}
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

export default ProgramPage;

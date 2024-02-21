import React, { useState, useEffect } from "react";
import "./Styles/programStyle.css";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
function ProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showADDForm, setShowADDForm] = useState(false);
  const [messages, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProgramId, setDeleteProgramId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [UDselectedCategoryId, setUDSelectedCategoryId] = useState("");
  const [showDeleteUpdatedformCategory, setShowDeleteUpdatedformCategory] =
    useState(false);
  const [showADDCategory, setShowADDCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    count: 0,
    description: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    participantsCount: "",
    category: "",
    description: "",
  });
  // todo  category form ---------------------------------------------------------
  const handleADDCategoryClick = () => {
    // Prevent default form submission behavior
    setShowADDCategory(true);
  };
  const handleDeleteUpdateCategoryClick = () => {
    setShowDeleteUpdatedformCategory(true);
  };
  const handleInputChangeCAtegory = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  // ? add category --------------------------------------------------------------
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/category/addcategory",
        newCategory
      );

      if (response.status === 201) {
        message.success(response.data.message);
        // Clear the form after successful addition
        // Update the categories state by appending the new category
        setCategories([...categories, newCategory]);
        setShowADDCategory(false);
        // Optionally, you can fetch categories again to update the list
        fetchCategories();
      } else {
        // Handle error response
        setMessage(
          response.data.error ||
            response.data.message ||
            "Failed to add program."
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding program:", error);
      // setMessage(error.response.data.message || "Failed to add program.");
      setMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to add program."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };
  //? Function to handle change in category selection-----------------------------
  const handleCategorySelectChange = (e) => {
    const categoryId = e.target.value;
    setUDSelectedCategoryId(categoryId); // Update the selected category ID
    // Find the selected category by its ID
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    // Calculate the count of programs related to the selected category
    const programCount = programs.filter(
      (program) => program.category === categoryId
    ).length;
    // Populate the form fields with the selected category's details
    if (selectedCategory) {
      setNewCategory({
        ...newCategory,
        name: selectedCategory.name,
        count: programCount, // Update count based on selected category's programs
        description: selectedCategory.description,
      });
    }
  };

  //? Function to handle updating a category ----=================================
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/category/updatecategories/${UDselectedCategoryId}`,
        newCategory
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setShowDeleteUpdatedformCategory(false);
        // Optionally, you can fetch categories again to update the list
        fetchCategories();
      } else {
        setMessage(
          response.data.error ||
            response.data.message ||
            "Failed to update category."
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to update category."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };
  //? Function to handle deleting a category==============================================
  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      // User canceled deletion
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/category/deletecategories/${UDselectedCategoryId}`
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setShowDeleteUpdatedformCategory(false);
        fetchCategories();
      } else {
        setMessage(
          response.data.error ||
            response.data.message ||
            "Failed to delete category."
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to delete category."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // todo end category form ---------------------------------------------------------
  // ! form update program ---------------------------------------------------
  const handleUpdateClick = (programId) => {
    setShowUpdateForm(true);
    setDeleteProgramId(programId);
    const selectedProgram = programs.find(
      (program) => program._id === programId
    );
    if (selectedProgram) {
      setFormData({
        ...formData,
        name: selectedProgram.name,
        price: selectedProgram.price,
        participantsCount: selectedProgram.participantsCount,
        category: selectedProgram.category,
        description: selectedProgram.description,
      });
      // Set the image URL in the state
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: selectedProgram.image,
      }));
    }
  };

  const handleADDClick = () => {
    // Prevent default form submission behavior
    setShowADDForm(true);
  };

  const handleCancelClick = () => {
    setShowUpdateForm(false);
    setShowADDForm(false);
    setShowConfirmation(false);
    setShowADDCategory(false);
    setShowDeleteUpdatedformCategory(false);
  };
  const handleDeleteClick = (programID) => {
    setShowConfirmation(true);
    setDeleteProgramId(programID);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };
  // ! delete program ---------------------------------------------
  const handleDeleteConfirmation = async () => {
    try {
      // Perform delete operation here
      // For example:
      const response = await axios.delete(
        `http://localhost:3000/program/deleteprogrambyid/${deleteProgramId}`
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setShowConfirmation(false);
        fetchPrograms();
      } else {
        setMessage(response.data.message);
        setMessage(response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
      setShowConfirmation(false);
      fetchCategories();
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
      console.error("Error adding user:", error);
      console.error("Error deleting user:", error);
    }
  };
  // ! update program --------------------------------------------
  const handleUpdateProgram = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append form data to FormData object
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image); // Append the image file

      const response = await axios.put(
        `http://localhost:3000/program/updateprogrambyid/${deleteProgramId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Update state or perform any necessary actions upon successful update
        message.success(response.data.message);
        setShowUpdateForm(false); // Close the form
        fetchPrograms(); // Optionally, fetch updated programs
      } else {
        setMessage(
          response.data.error ||
            response.data.message ||
            "Failed to update program."
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating program:", error);
      setMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to update program."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  //! Fetch categories data from the backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/category/allcategories"
      );
      if (response.status === 200) {
        setCategories(response.data);
        // alert(JSON.stringify(data));
      } else {
        const errorMessage = await response.text();
        console.error("Failed to fetch categories:", errorMessage);
        message.error(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // ! add program------------------------------------------------
  const handleADDProgram = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formDataToSend = new FormData(); // Create a new FormData object

      // Append form data to FormData object
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("participantsCount", formData.participantsCount);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);

      const response = await axios.post(
        "http://localhost:3000/program/Addprogram",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Update state or perform any necessary actions upon successful addition
        message.success("Program added successfully!");
        setShowADDForm(false); // Close the form
        // Optionally, you can also fetch updated programs after adding a new one
        fetchPrograms();
      } else {
        // Handle error response
        setMessage(
          response.data.error ||
            response.data.message ||
            "Failed to add program."
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding program:", error);
      // setMessage(error.response.data.message || "Failed to add program.");
      setMessage(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to add program."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // ! get all program ===============================================
  useEffect(() => {
    // Fetch programs data from the backend when the component mounts
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/program/getAllprograms"
      );
      if (response.status === 200) {
        setPrograms(response.data);
        setIsLoading(false);
        // alert(JSON.stringify(data));
      } else {
        message.error(response.data.message);
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
        console.error("Failed to fetch programs");
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };
  // Handle click on a category name
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Handle click on "All Programs" option
  const handleAllProgramsClick = () => {
    setSelectedCategoryId(""); // Set selectedCategoryId to empty string to display all programs
  };
  return (
    <div>
      <ul className="menuC">
        <div className="listPN">
          {/* Option for displaying all programs */}
          <li onClick={handleAllProgramsClick}>
            <Link>
              <span>All Category</span>
            </Link>
          </li>
          {/* Display categories */}
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <Link>
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </div>

        <div className="listPN">
          <i className="plus" onClick={handleADDCategoryClick}>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          <i className="trashbtn">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={handleDeleteUpdateCategoryClick}
            />
          </i>
        </div>
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
      <div className="listPNSmall">
        <i className="plus" onClick={handleADDCategoryClick}>
          <FontAwesomeIcon icon={faPlus} />
        </i>
        <i className="trashbtn">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={handleDeleteUpdateCategoryClick}
          />
        </i>
      </div>
      <div className="dropdown">
        <button className="dropbtn" onClick={handleAllProgramsClick}>
          All Categorys
        </button>
        <div className="dropdown-content">
          {/* Option for displaying all programs */}
          {categories.map((category) => (
            <a
              key={category._id}
              href={`#${category.name}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

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
        <div className="cardsProgram">
          {programs
            .filter(
              (program) =>
                !selectedCategoryId || program.category === selectedCategoryId
            ) // Filter programs based on selected category ID
            .map((program) => (
              <div
                key={program._id}
                className="relative flex w-80 flex-col rounded-xl bg-blue-600 bg-clip-border text-white shadow-md"
              >
                <div className="relative mx-4 -mt-6 h-64 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img
                    src={`http://localhost:3000/uploads/${program.image}`}
                    alt={program.name}
                    className="w-full h-full object-fill object-cover"
                   
                  />
                </div>

                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {program.name}
                  </h5>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Total Users: <span>{program.participantsCount}</span>
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="btnReadMore"
                    onClick={() => handleUpdateClick(program._id)}
                  >
                    Read More
                  </button>
                  <button
                    className="btnDeleteP"
                    onClick={() => handleDeleteClick(program._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {showUpdateForm && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <form className="formProgram">
              <p className="title">Update Program</p>
              <p className="message">Update the Program details below.</p>
              <img
                className="w-8/12 h-80 rounded-xl mt-7"
                src={`http://localhost:3000/uploads/${formData.image}`}
                alt={formData.name}
              />
              <div className="fexIn">
                <label>
                  <input
                    required
                    placeholder
                    type="text"
                    className="input"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <span>Name</span>
                </label>
                <label>
                  <input
                    required
                    placeholder
                    type="number"
                    className="input"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
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
                    onChange={handleFileChange}
                  />
                </label>
                <label>
                  <input
                    required
                    placeholder
                    type="number"
                    className="input"
                    name="participantsCount"
                    value={formData.participantsCount}
                    onChange={handleInputChange}
                  />
                  <span>Count</span>
                </label>
              </div>

              <div className="fexIn">
                <label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
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
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuser">
                <button
                  type="submit"
                  className="submit"
                  onClick={handleUpdateProgram}
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
              <p className="messageadduser"></p>
            </form>
          </form>
        </div>
      )}
      {showADDForm && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <form className="formProgram">
              <p className="title">ADD Program</p>
              <p className="message">Enter the Program details below.</p>
              <div className="fexIn">
                <label>
                  <input
                    required
                    type="text"
                    className="input"
                    name="name" // Add name attribute for the name input field
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <span>Name</span>
                </label>
                <label>
                  <input
                    required
                    type="number"
                    className="input"
                    name="price" // Add name attribute for the price input field
                    value={formData.price}
                    onChange={handleInputChange}
                  />
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
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <label>
                  <input
                    required
                    type="number"
                    className="input"
                    name="participantsCount" // Add name attribute for the count input field
                    value={formData.participantsCount}
                    onChange={handleInputChange}
                  />
                  <span>Count</span>
                </label>
              </div>

              <div className="fexIn">
                <label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
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
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuser">
                <button className="submit" onClick={handleADDProgram}>
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
              <p className="messageadduser">{messages}</p>
            </form>
          </form>
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
      {showADDCategory && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <form className="formProgram">
              <p className="title">ADD Category</p>
              <p className="message">Enter the Category details below.</p>
              <div className="fexIn">
                <label>
                  <input
                    required
                    type="text"
                    className="input"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChangeCAtegory} // Add name attribute for the name input field
                  />
                  <span>Name</span>
                </label>
                <label>
                  <input
                    required
                    type="number"
                    className="input"
                    name="count"
                    value={newCategory.count}
                    onChange={handleInputChangeCAtegory} // Add name attribute for the price input field
                  />
                  <span>Count</span>
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
                    value={newCategory.description}
                    onChange={handleInputChangeCAtegory}
                    required
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuser">
                <button className="submit" onClick={handleAddCategory}>
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
              <p className="messageadduser">{messages}</p>
            </form>
          </form>
        </div>
      )}
      {showDeleteUpdatedformCategory && (
        <div id="id01" className="modalProgram">
          <form className="modal-contentProgram animate">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <form className="formProgram">
              <p className="title">Update OR Delete Category</p>
              <p className="message">Enter the Category details below.</p>
              <div className="fexIn">
                <label>
                  <select
                    value={UDselectedCategoryId}
                    onChange={handleCategorySelectChange}
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <input
                    required
                    type="text"
                    className="input"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChangeCAtegory}
                  />
                  <span>Name</span>
                </label>
                <label>
                  <input
                    required
                    type="number"
                    className="input"
                    name="count"
                    value={newCategory.count}
                    onChange={handleInputChangeCAtegory}
                  />
                  <span>Count</span>
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
                    value={newCategory.description}
                    onChange={handleInputChangeCAtegory}
                    required
                  ></textarea>
                </label>
              </div>

              <div className="btnsFormuserUD">
                <div>
                  <button className="submit" onClick={handleUpdateCategory}>
                    Update
                  </button>
                  <button
                    className="submit"
                    id="subD"
                    onClick={handleDeleteCategory}
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className="Cancelbtn"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <p className="messageadduser">{messages}</p>
            </form>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProgramPage;

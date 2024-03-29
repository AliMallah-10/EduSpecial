import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faChartLine,
  faUsers,
  faHouse,
  faBriefcase,
  faHandHoldingDollar,
  faMagnifyingGlass,
  faList,
  faAngleDown,
  faBell,
  faRegistered,
} from "@fortawesome/free-solid-svg-icons";

import "./Styles/dashStyle.css";
import "./Styles/FormDashStyle.css";
// import { message } from "antd";
function DashAdmin() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the click is outside the dropdown
      if (event.target.closest(".user-wrapper") === null && dropdownVisible) {
        setDropdownVisible(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClick);

    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dropdownVisible]);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  // Dummy data for demonstration
  const profileImage =
    localStorage.getItem("profileImage") ||
    require("../../Assets/images/member4.png");
  const adminName = localStorage.getItem("adminName") || "Admin Name";
  const adminMajor =
    localStorage.getItem("adminMajor") || "Major: Computer Science";
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to logout endpoint
      const response = await axios.post("http://localhost:3000/users/logout");
      // Retrieve token and refresh token from cookies
      // const token = document.cookie.replace(
      //   /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      //   "$1"
      // );
      // const refreshToken = document.cookie.replace(
      //   /(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/,
      //   "$1"
      // );

      // Send token and refresh token in headers
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "X-Refresh-Token": refreshToken,
      //   },
      // };

      if (response.status === 200) {
        // Clear cookies
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Redirect to login page or handle logout success
        // For example:
        message.success(response.data.message);
        window.location.href = "/signin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  // Example data for a bar chart

  return (
    <body>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span>
              <FontAwesomeIcon icon={faHandHoldingHeart} />
            </span>
            <span>EDUSpecial</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            {" "}
            <li>
              <Link to="/signin">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/AdminDash/mainPage">
                <a href="dd" className="active">
                  <span>
                    <FontAwesomeIcon icon={faChartLine} />
                  </span>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/AdminDash/userPage">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span>Users</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/AdminDash/programPage">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                  <span>Programs</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/AdminDash/donationPage">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                  </span>
                  <span>Donations</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/AdminDash/enrollPage">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faRegistered} />
                  </span>
                  <span>Enrollment</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <header>
          <h3>
            <label htmlFor="nav-toggle">
              <span>
                <FontAwesomeIcon icon={faList} />
              </span>
            </label>
            Dashboard
          </h3>
          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search ..."
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <div className="user-wrapper">
            <div>
              <i>
                <FontAwesomeIcon icon={faBell} />
              </i>
              <span id="dropdownstyle" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
              {dropdownVisible && (
                <div className="flex flex-col dropdownProfile">
                  <ul className="flex flex-col gap-4">
                    <Link to="/AdminDash/profilePage">
                      <li>Profile</li>
                    </Link>

                    <li onClick={handleLogout}>Logout </li>
                  </ul>
                </div>
              )}
            </div>
            <img
              src={profileImage}
              width={"40px"}
              height={"40px"}
              alt="profile img"
            />
            <div className="infoheader">
              <h4>{adminName}</h4>
              <small>{adminMajor}</small>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </body>
  );
}

export default DashAdmin;

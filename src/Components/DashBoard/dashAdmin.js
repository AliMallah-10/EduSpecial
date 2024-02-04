import React from "react";
import axios from "axios";
import { ManagerDashboard } from "../Data/dataDashB";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./dashStyle.css";
import { message } from "antd";
function DashAdmin() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Make a request to the server to invalidate the tokens and clear cookies
      const response = await axios.post("http://localhost:3000/users/logout");
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/signin");
        // Set the state to redirect to the login page
      } else {
        message.error(response.data.message);
      }
      // Redirect the user to the login page or any other desired page
      navigate("/signin");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Clinic Logo</h6>
            <hr />
          </div>
          <div className="menu">
            {ManagerDashboard.map((menu) => {
              return (
                <>
                  <div key={menu.id} className="menu-item">
                    <i className={menu.icon}></i>
                    <Link className="link" to={menu.path}>
                      {menu.name}
                    </Link>
                  </div>
                </>
              );
            })}
            <div className="menu-item">
              <i className="fa-solid fa-right-from-bracket"></i>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="dash">
              <i class="fa-solid fa-gauge"></i>
              <p>Manager DashBoard</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-contact">
              <i class="fa-sharp fa-solid fa-bell"> </i>
              {/* {user && <p>{user.username}</p>}
               */}
              {/* {userlogin} */}
            </div>
          </div>

          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashAdmin;

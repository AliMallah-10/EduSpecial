import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIN from "./Pages/SignIN";
import SignUP from "./Pages/SignUP";
import DashAdmin from "./Pages/DashAdmin";
import ResetPassword from "./Pages/ResetPassword";
import VerifPage from "./Pages/VerifPage";
import HomePage from "./Pages/homepage";
import Events from "./Pages/eventspage";
import Layout from "./Components/layout/layout"; // Adjust the import path and component name
import EventsBlog from "./Pages/eventsblog";
import EventsBlogTwo from "./Pages/eventsblogtwo";
import EventsBlogThree from "./Pages/eventsblogthree";
import EventsBlogFour from "./Pages/eventsblogfour";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Route for SignIN component */}
          <Route path="/signin" element={<SignIN />} />
          {/* Route for SignIN component */}
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          {/* Route for Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Route for SignIN component */}
          <Route path="/emailVerify" element={<VerifPage />} />

          {/* Route for SignUP component */}
          <Route path="/signup" element={<SignUP />} />

          {/* Route for DashAdmin component */}
          <Route path="/AdminDash" element={<DashAdmin />} />

          <Route path="/events" element={<Events />} />
          <Route path="/eventsblog" element={<EventsBlog />} />
          <Route path="/eventsblogtwo" element={<EventsBlogTwo />} />
          <Route path="/eventsblogthree" element={<EventsBlogThree />} />
          <Route path="/eventsblogfour" element={<EventsBlogFour />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIN from "./Pages/SignIN";
import SignUP from "./Pages/SignUP";
import DashAdmin from "./Pages/DashAdmin";
import ResetPassword from "./Pages/ResetPassword";
import VerifPage from "./Pages/VerifPage";
import MainPage from "./Pages/dashboard_Pages/MainPage";
import UsersPage from "./Pages/dashboard_Pages/UsersPage";
import ProfilePage from "./Pages/dashboard_Pages/ProfilePage";
import ProgramPage from "./Pages/dashboard_Pages/ProgramNamePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for SignIN component */}
        <Route path="/signin" element={<SignIN />} />
        {/* Route for SignIN component */}
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />

        {/* Route for SignIN component */}
        <Route path="/emailVerify" element={<VerifPage />} />
        {/* Route for SignUP component */}
        <Route path="/signup" element={<SignUP />} />
        {/* Route for DashAdmin component */}
        <Route path="AdminDash" element={<DashAdmin />}>
          <Route path="mainPage" element={<MainPage />} />
          <Route path="userPage" element={<UsersPage />} />
          <Route path="profilePage" element={<ProfilePage />} />
          <Route path="programPage" element={<ProgramPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

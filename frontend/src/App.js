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
import DonationPage from "./Pages/dashboard_Pages/DonationPage";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Data/ProtectRoute";
import EnrollPage from "./Pages/dashboard_Pages/EnrollPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route: Redirect to SignIN page */}
        <Route path="/" element={<SignIN />} />
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

        {/* Use ProtectedRoute for DashAdmin component */}

        <Route
          path="/AdminDash"
          element={
            <ProtectedRoute>
              <DashAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="mainPage" element={<MainPage />} />
          <Route path="userPage" element={<UsersPage />} />
          <Route path="profilePage" element={<ProfilePage />} />
          <Route path="programPage" element={<ProgramPage />} />
          <Route path="donationPage" element={<DonationPage />} />
          <Route path="enrollPage" element={<EnrollPage />} />
        </Route>

        {/* Route for any unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

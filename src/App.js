import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIN from "./Pages/SignIN";
import SignUP from "./Pages/SignUP";
import DashAdmin from "./Pages/DashAdmin";
import ResetPassword from "./Pages/ResetPassword";
import VerifPage from "./Pages/VerifPage";
import HomePage from "./Pages/homepage";
import Events from "./Pages/eventspage";
import Layout from "./Components/layout/layout";
import EventsBlog from "./Pages/eventsblog";
import EventsBlogTwo from "./Pages/eventsblogtwo";
import EventsBlogThree from "./Pages/eventsblogthree";
import EventsBlogFour from "./Pages/eventsblogfour";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/signin" element={<SignIN />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/emailVerify" element={<VerifPage />} />
          <Route path="/signup" element={<SignUP />} />
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

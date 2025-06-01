import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import ThankYou from "./pages/ThankYou";
import ErrorPage from "./pages/Error";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default App;

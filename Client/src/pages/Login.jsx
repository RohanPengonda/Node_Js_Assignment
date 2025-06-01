import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // for email and passord
      await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // for sending otp
      await axios.post("http://localhost:5000/api/otp/send", { email });

      localStorage.setItem("email", email);
      navigate("/otp");
    } catch (err) {
      console.error("Login or OTP error:", err);
      navigate("/error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
      <div className="p-4 rounded-lg w-80 bg-white">
        <h2 className=" text-2xl font-bold text-center mt-4 mb-4">Login</h2>
        <form onSubmit={handleLogin} className="py-5">
          <div className="flex flex-col items-center justify-center p-2">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border mb-6 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
            />

            <button
              type="submit"
              className="w-1/3  text-white py-2 rounded  cursor-pointer bg-green-600 mb-4 hover:bg-green-700"
            >
              Login
            </button>
            <Link
              to="/register"
              className="block text-center text-blue-500 mt-2 "
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  // console.log(localStorage.getItem("email"));
  // console.log(email, otp);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, code);

      const res = await axios.post("http://localhost:5000/api/otp/verify", {
        email,
        code,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/thankyou");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,6}$/.test(val)) setCode(val); // Allow only up to 6 digits numeric
          }}
          required
          placeholder="Enter OTP"
          className=" w-full px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Otp;

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    age: "",
    dob: "",
    image: null,
  });

  const inputFields = ["name", "email", "password", "company", "age", "dob"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      if (!["image/png", "image/jpeg"].includes(file.type)) {
        toast.error("Only PNG or JPG images are allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be under 2MB");
        return;
      }

      setForm((prev) => ({ ...prev, image: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const data = new FormData();
    for (const key in form) {
      data.append(key, form[key]);
    }

    try {
      const baseUrl = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(`${baseUrl}/api/auth/register`, data);
      toast.success("Registered successfully!");
      console.log(response.data);

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        company: "",
        age: "",
        dob: "",
        image: null,
      });

      // go to login page
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(
        "Error during registration: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-4 py-4 rounded-xl shadow-lg w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center text-green-600">
          Create Account
        </h2>

        {inputFields.map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={
                field === "dob"
                  ? "date"
                  : field === "password"
                  ? "password"
                  : field === "age"
                  ? "number"
                  : "text"
              }
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Image (PNG/JPG)
          </label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
        >
          Register
        </button>
        <Link to="/" className="block text-center text-blue-500 mt-2 ">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;

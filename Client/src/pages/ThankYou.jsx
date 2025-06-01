import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThankYou = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${user.email}`);
      localStorage.clear();
      toast.success("Account deleted");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <ToastContainer />
      <div className="bg-white h-150 px-4 py-6 rounded shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-6">
          Welcome,
          <br />
          <p className="mt-2"> {user.name}!</p>
        </h1>
        <img
          src={`data:image/jpeg;base64,${user.image}`}
          alt="Profile"
          className="w-30 h-30 rounded-full mx-auto mb-6 mt-6"
        />
        <div className="flex flex-col items-baseline px-12 gap-5">
          <p>
            <strong>Email: </strong> {user.email}
          </p>
          <p>
            <strong>Name: </strong> {user.name}
          </p>
          <p>
            <strong>Company: </strong> {user.company}
          </p>
          <p>
            <strong>Age: </strong> {user.age}
          </p>
          <p>
            <strong>DOB: </strong> {formatDate(user.dob)}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="mt-10 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Remove Account
        </button>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white w-20 ml-15 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ThankYou;

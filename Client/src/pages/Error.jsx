import React from "react";
import { Link } from "react-router-dom";
import error_img from "../assets/error.png";

const ErrorPage = () => (
  <div className=" flex items-center justify-center bg-white">
    <div className="bg-white p-6 rounded shadow text-center">
      <img className="w-100 h-100" src={error_img} alt="" />
      <h1 className="text-xl font-semibold text-gray-900">
        <p>Sorry, we can't log you in.</p> <br />
        <p>
          You may have entered the <u>wrong credentials.</u>
        </p>
      </h1>
      <div className="flex items-center justify-evenly mt-10">
        <Link
          to="/"
          className="py-1 text-center text-white bg-blue-500 w-25 rounded h-8 hover:bg-blue-800"
        >
          Try Again
        </Link>
      </div>
    </div>
  </div>
);

export default ErrorPage;

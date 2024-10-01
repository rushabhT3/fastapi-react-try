import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/", { replace: true });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        <Logout />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Profile;

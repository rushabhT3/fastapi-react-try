import React from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../Logout";

const Header = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md rounded mb-4 p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <Logout setToken={setToken} />
      </div>
    </header>
  );
};

export default Header;
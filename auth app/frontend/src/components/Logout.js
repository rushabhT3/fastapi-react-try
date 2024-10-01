import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 font-bold"
    >
      Logout
    </button>
  );
}

export default Logout;

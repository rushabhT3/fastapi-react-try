import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-blue-500 font-bold text-lg">
              React FastApi Auth App
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-gray-700 hover:text-blue-500">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Signup
                </Link>
              </li>
              {token && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

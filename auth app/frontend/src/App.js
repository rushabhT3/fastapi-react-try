import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Logout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-blue-500 font-bold text-lg">
              React FastApi Auth App
            </Link>
            <ul className="flex space-x-4">
              {!token ? (
                <>
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
                </>
              ) : (
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
                    <Logout setToken={setToken} />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            !token ? <Login setToken={setToken} /> : <Navigate to="/profile" />
          }
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={
            token ? <Profile setToken={setToken} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

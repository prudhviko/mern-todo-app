import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ToDo App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../../store/authContext";

import "./Header.css";

const navActive = (navStatus) =>
  navStatus.isActive ? "nav-link active aria-current" : "nav-link";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    handleCollapse();
    authCtx.onLogout();
    navigate("/");
  };

  const handleCollapse = () => {
    const nav = document.getElementById("navbarNav");
    const btn = document.getElementById("navbarBtn");
    nav.classList.remove("show");
    btn.classList.add("collapsed");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-5 position-relative border-bottom">
      <button
        id="navbarBtn"
        className="navbar-toggler m-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle Navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <NavLink
        className="navbar-brand d-none d-lg-block"
        to="/"
        onClick={handleCollapse}>
        chatAPI
      </NavLink>

      <NavLink
        className="navbar-brand d-lg-none"
        to="/"
        onClick={handleCollapse}>
        chat
      </NavLink>

      <div className="collapse navbar-collapse text-uppercase" id="navbarNav">
        <div className="navbar-nav ms-auto">
          {!authCtx.isLoggedIn && (
            <NavLink
              className={(nD) => navActive(nD)}
              to="/login"
              onClick={handleCollapse}>
              Login/Register
            </NavLink>
          )}

          {authCtx.isLoggedIn && (
            <>
              <div className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="myAccountDD"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  My Account
                </div>

                <div
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="myAccountDD">
                  <span
                    className="dropdown-item text-danger"
                    role="button"
                    onClick={logoutHandler}>
                    Logout
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* <span className="navbar-title">Dish Calculator</span> */}
        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">
            Calculadora
          </NavLink>
          <NavLink to="/cobrar" className="navbar-link">
            Cobrar
          </NavLink>
          <NavLink to="/lista" className="navbar-link">
            Productos
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

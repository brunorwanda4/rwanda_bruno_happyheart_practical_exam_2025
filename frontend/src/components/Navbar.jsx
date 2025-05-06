import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md mb-6 px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          Training App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/trades">Trades</Link>
          </li>
          <li>
            <Link to="/trainees">Trainees</Link>
          </li>
          <li>
            <Link to="/modules">Modules</Link>
          </li>
          <li>
            <Link to="/marks">Marks</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

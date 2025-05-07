import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import UseAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home or login page
  };

  return (
    <aside className="w-64 h-screen bg-base-200 p-6 shadow-lg fixed">
      <div className="mb-10">
        <Link to="/admin" className="text-2xl font-bold text-primary">
          SOS school
        </Link>
      </div>
      <ul className="space-y-4 text-base">
        <li>
          <Link to="/admin" className=" btn btn-secondary w-full justify-start btn-ghost">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/admin/trades" className=" btn btn-secondary w-full justify-start btn-ghost">
            <FaTools /> Trades
          </Link>
        </li>
        <li>
          <Link to="/admin/trainees" className=" btn btn-secondary w-full justify-start btn-ghost">
            <FaUserGraduate /> Trainees
          </Link>
        </li>
        <li>
          <Link to="/admin/modules" className=" btn btn-secondary w-full justify-start btn-ghost">
            <FaBookOpen /> Modules
          </Link>
        </li>
        <li>
          <Link to="/admin/marks" className=" btn btn-secondary w-full justify-start btn-ghost">
            <FaClipboardList /> Marks
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className=" btn btn-secondary w-full justify-start btn-ghost w-full text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

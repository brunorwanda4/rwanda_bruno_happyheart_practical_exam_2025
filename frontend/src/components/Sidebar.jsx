import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaPeopleArrows,
} from "react-icons/fa";
import UseAuth from "../hooks/useAuth";
const Sidebar = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current path

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper to check if current path matches
  const isActive = (path) => location.pathname === path;
  return (
    <aside className="w-64 h-screen bg-base-200 p-6 shadow-lg fixed">
      <div className="mb-10">
        <Link to="/admin" className="text-2xl font-bold text-primary">
          SOS SCHOOL
        </Link>
      </div>
      <ul className="space-y-4 text-base">
        <li>
          <Link
            to="/admin"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin/users") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaPeopleArrows /> Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/trades"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin/trades") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaTools /> Trades
          </Link>
        </li>
        <li>
          <Link
            to="/admin/trainees"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin/trainees") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaUserGraduate /> Trainees
          </Link>
        </li>
        <li>
          <Link
            to="/admin/modules"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin/modules") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaBookOpen /> Modules
          </Link>
        </li>
        <li>
          <Link
            to="/admin/marks"
            className={`btn w-full justify-start btn-ghost ${
              isActive("/admin/marks") ? "btn-active bg-primary text-white" : "btn-secondary"
            }`}
          >
            <FaClipboardList /> Marks
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="btn text-error w-full justify-start btn-ghost text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

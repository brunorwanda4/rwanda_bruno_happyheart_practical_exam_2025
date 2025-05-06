import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-base-200 p-6 shadow-lg fixed">
      <div className="mb-10">
        <Link to="/admin" className="text-2xl font-bold text-primary">
          SOS school
        </Link>
      </div>
      <ul className="space-y-4 text-base">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-3 hover:text-primary"
          >
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/trades"
            className="flex items-center gap-3 hover:text-primary"
          >
            <FaTools /> Trades
          </Link>
        </li>
        <li>
          <Link
            to="/admin/trainees"
            className="flex items-center gap-3 hover:text-primary"
          >
            <FaUserGraduate /> Trainees
          </Link>
        </li>
        <li>
          <Link
            to="/admin/modules"
            className="flex items-center gap-3 hover:text-primary"
          >
            <FaBookOpen /> Modules
          </Link>
        </li>
        <li>
          <Link
            to="/admin/marks"
            className="flex items-center gap-3 hover:text-primary"
          >
            <FaClipboardList /> Marks
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

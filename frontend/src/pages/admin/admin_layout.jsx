import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // updated import
import UsersPage from "./UsersPage";
import TradesPage from "./TradesPage";
import TraineesPage from "./TraineesPage";
import ModulesPage from "./ModulesPage";
import MarksPage from "./MarksPage";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64 p-6">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/trainees" element={<TraineesPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/marks" element={<MarksPage />} />
          <Route
            path="/"
            element={<div>Home Page - Select a form from the sidebar</div>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

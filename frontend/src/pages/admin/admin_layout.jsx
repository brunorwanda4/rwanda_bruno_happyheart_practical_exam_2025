import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import UsersPage from "./UsersPage";
import TradesPage from "./TradesPage";
import TraineesPage from "./TraineesPage";
import ModulesPage from "./ModulesPage";
import MarksPage from "./MarksPage";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/trainees" element={<TraineesPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/marks" element={<MarksPage />} />
          <Route
            path="/"
            element={<div>Home Page - Select a form from the navbar</div>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

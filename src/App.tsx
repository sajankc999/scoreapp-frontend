import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";

import DashboardPage from "./pages/DashBoard";
import TeamList from "./pages/TeamList";
import Fixtures from "./pages/Fixtures";
import AddTeam from "./pages/AddTeam";
import Settings from "./pages/Settings";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="team-list" element={<TeamList />} />
          <Route path="fixtures" element={<Fixtures />} />
          <Route path="add-team" element={<AddTeam />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
  );
}

export default App;
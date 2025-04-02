import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardDetail } from "../details/dashboardDetail";
import { Dashboard } from "../dashboard/dashboard";

export const Pages = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/detail" element={<DashboardDetail />} />
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

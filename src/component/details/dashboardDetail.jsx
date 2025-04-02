import { TextField } from "@mui/material";
import "./dashboardDetail.scss";

export const DashboardDetail = () => {
  return (
    <div className="details-container">
      <div className="details-header">
        <div className="btn-with-header">Fiction</div>
        <div className="search-box">
          <TextField fullWidth />
        </div>
      </div>
      <div className="details-content">card</div>
    </div>
  );
};

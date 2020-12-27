import * as React from "react";
import AdminSidebar from "./AdminSidebar";

const containerStyles: React.CSSProperties = {
  width: "100%",
};

const sidebarContainer: React.CSSProperties = {
  width: "300px",
  height: "100%",
};

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div className="d-flex" style={containerStyles}>
      <div style={sidebarContainer}>
        <AdminSidebar />
      </div>
      <div className="mt-5 me-2 ms-2 col">{children}</div>
    </div>
  );
};

export default AdminLayout;

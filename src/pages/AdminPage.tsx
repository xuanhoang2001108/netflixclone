import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";

function AdminPage() {
  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );
}

export default AdminPage;

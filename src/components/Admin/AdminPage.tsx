import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard";

function AdminPage() {
  const location = useLocation();
  const isParentRoute = location.pathname.startsWith(
    "/AdminLoginPage/AdminPage"
  );
  console.log("pathname:", location.pathname);
  console.log("isParentRoute:", isParentRoute);

  return (
    <>
      {isParentRoute && <Dashboard />}
      <Outlet />
    </>
  );
}

export default AdminPage;

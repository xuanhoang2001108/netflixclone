import { Outlet } from "react-router-dom";

import AdminLoginContainer from "../components/AdminLoginContainer";

function AdminLoginPage() {
  return (
    <>
      <AdminLoginContainer></AdminLoginContainer>
      <Outlet />
    </>
  );
}

export default AdminLoginPage;

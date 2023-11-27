import { Outlet, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../store/service/getUser.service";

function AdminPage() {
  const navigate = useNavigate();
  const { data: currentUserData } = useGetCurrentUserQuery();
  const storedAccessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!storedAccessToken) {
      navigate("/LoginPage");
    } else {
      const isAdmin = currentUserData?.roles?.some(
        (role: any) => role.name === "Admin"
      );
      if (!isAdmin) {
        navigate("/HomePage");
      }
    }
  }, [currentUserData, navigate, storedAccessToken]);

  console.log(currentUserData);

  return (
    <>
      <Dashboard />

      <Outlet />
    </>
  );
}

export default AdminPage;

import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  useGetAllPermissionQuery,
  useGetCurrentUserQuery,
} from "../store/service/getUser.service";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/base/Button";

function AdminLoginContainer() {
  const accessToken = localStorage.getItem("accessToken") ?? "";
  const { data: currentUserData } = useGetCurrentUserQuery({ accessToken });

  useGetAllPermissionQuery(currentUserData?.id ?? "");
  const navigate = useNavigate();
  // useEffect(() => {
  //   const storedAccessToken = localStorage.getItem("accessToken");
  //   if (!storedAccessToken) {
  //     navigate("/LoginPage");
  //   }
  // }, [navigate]);
  // useEffect(() => {
  //   if (currentUserData) {
  //     if (currentUserData?.roles?.some((role: any) => role.name === "Admin")) {
  //       navigate("/AdminLoginPage");
  //     } else {
  //       navigate("/HomePage");
  //     }
  //   }
  // }, [navigate, currentUserData]);
  const isAdminPage = location.pathname.startsWith("/AdminLoginPage/AdminPage");

  return (
    <Box sx={{ mt: 2, display: isAdminPage ? "none" : "block" }}>
      <Box sx={{ margin: 10 }}>
        <Typography variant="h5">
          You logged in as {currentUserData?.userName}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            onClick={() => {
              navigate("/HomePage");
            }}
          >
            Login as User
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={() => {
              navigate("/AdminLoginPage/AdminPage");
            }}
          >
            Login as Admin
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLoginContainer;

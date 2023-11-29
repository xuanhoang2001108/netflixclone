import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useGetCurrentUserQuery } from "../store/service/getUser.service";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/base/Button";

function AdminLoginContainer() {
  const accessToken = localStorage.getItem("accessToken") ?? "";
  const { data: currentUserData } = useGetCurrentUserQuery({ accessToken });
  const navigate = useNavigate();
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      navigate("/LoginPage");
    }
  }, [navigate]);
  useEffect(() => {
    if (currentUserData) {
      if (currentUserData?.roles?.some((role: any) => role.name === "User")) {
        navigate("/AdminLoginPage");
      } else {
        navigate("/HomePage");
      }
    }
  }, [navigate, currentUserData]);
  const isAdminPage = location.pathname.startsWith("/AdminLoginPage/AdminPage");
  return (
    <Box sx={{ mt: 2, display: isAdminPage ? "none" : "block" }}>
      <Box sx={{margin: 10}}>
        <Typography variant="h5">Admin Login Page</Typography>

        <Typography variant="h6">Choose how you want to log in:</Typography>
        <Box sx={{ mt: 2 }}>
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

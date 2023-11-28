import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ margin: 10 }}>
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
            navigate("/AdminPage");
          }}
        >
          Login as Admin
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLoginPage;

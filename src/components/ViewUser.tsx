import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../store/service/getUser.service";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserByIdQuery(userId || "");

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!userData) {
    return <Box>User not found</Box>;
  }

  const { userName, email, phoneNumber, id } = userData;

  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, ml: 2 }}>
          {userName}
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: 40 }}
          onClick={() => navigate(`/AdminPage/UserPage/EditUser/${id}`)}
        >
          <CreateIcon sx={{ mr: 2 }}></CreateIcon> EDIT
        </Button>
        <Button variant="contained" sx={{ ml: 2 }}>
          <DeleteIcon sx={{ mr: 2 }}></DeleteIcon> DELETE
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-read-only-input"
          label="User Name"
          defaultValue={userName}
          InputProps={{
            readOnly: true,
          }}
          sx={{ input: { color: "black" }, mb: 2 }}
        ></TextField>
        <TextField
          id="outlined-read-only-input"
          label="Email"
          defaultValue={email}
          InputProps={{
            readOnly: true,
          }}
          sx={{ input: { color: "black" }, mb: 2 }}
        ></TextField>
        <TextField
          id="outlined-read-only-input"
          label="Phone Number"
          defaultValue={phoneNumber}
          InputProps={{
            readOnly: true,
          }}
          sx={{ input: { color: "black" } }}
        ></TextField>
        <Box>List of roles</Box>
      </Box>
    </Box>
  );
}

export default ViewUser;

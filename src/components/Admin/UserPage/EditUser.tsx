import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllUserQuery,
  useGetUserByIdQuery,
} from "../../../store/service/getUser.service";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useEditPhoneNumberMutation } from "../../../store/service/register.service";
import { useState } from "react";

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [editPhoneNumberMutation] = useEditPhoneNumberMutation();
  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserByIdQuery(userId || "");
  const { refetch } = useGetAllUserQuery();
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");

  
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!userData) {
    return <Box>User not found</Box>;
  }
  const handleSave = async () => {
    try {
      const { id } = userData;
      await editPhoneNumberMutation({ id, phoneNumber });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveClose = async () => {
    try {
      const { id } = userData;
      await editPhoneNumberMutation({ id, phoneNumber });
      navigate("/AdminLoginPage/AdminPage/UserPage");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const { userName, email } = userData;
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, ml: 2 }}>
          {userName}
        </Typography>
        <Button variant="contained" sx={{ ml: 30 }} onClick={handleSave}>
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSaveClose}>
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE & CLOSE
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => navigate("/AdminLoginPage/AdminPage/UserPage")}
        >
          CANCEL
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          label="Phone Number"
          defaultValue={userData.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ input: { color: "black" } }}
        ></TextField>
        <Box>Selected Role</Box>
      </Box>
    </Box>
  );
}

export default EditUser;

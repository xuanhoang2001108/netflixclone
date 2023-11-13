import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRoleNameQuery,
  useGetUserByIdQuery,
} from "../store/service/getUser.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
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

  const { userName, email, phoneNumber, roleIds } = userData;

  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, ml: 2 }}>
          {userName}
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: 40 }}
          onClick={() => navigate(`/AdminPage/UserPage/EditUser/${userId}`)}
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
        <Typography variant="h5" sx={{ mb: 2, color: "black" }}>
          List of Roles
        </Typography>
        <Table sx={{ border: "1px solid #ddd", borderRadius: 8 }}>
          <TableHead >
            <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
              <Typography variant="h6" sx={{ ml: 1, color: "black" }}>
                Name
              </Typography>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              border: "1px solid #ddd",
            }}
          >
            <TableCell sx={{ color: "black" }}>
              {Array.isArray(roleIds) &&
                roleIds.map((roleId) => (
                  <Box sx={{ mb: 2 }}>
                    <RoleName key={roleId} roleId={roleId} />
                    <hr />
                  </Box>
                ))}
            </TableCell>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export function RoleName({ roleId }: { roleId: string }) {
  const {
    data: roleNameData,
    error: roleNameError,
    isLoading: roleNameIsLoading,
  } = useGetRoleNameQuery(roleId);

  if (roleNameIsLoading) {
    return <Box>Loading role name...</Box>;
  }

  if (roleNameError) {
    return <Box>Error loading role name</Box>;
  }

  return <div>{roleNameData?.name || "Role Name Not Found"}</div>;
}

export default ViewUser;

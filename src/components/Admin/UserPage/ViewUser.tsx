import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllPermissionQuery,
  useGetCurrentUserQuery,
  useGetRoleNameQuery,
  useGetUserByIdQuery,
} from "../../../store/service/getUser.service";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { useDeleteAccountMutation } from "../../../store/service/register.service";
import React from "react";
import { toast } from "react-toastify";

function ViewUser() {
  const accessToken = localStorage.getItem("accessToken") ?? "";
  const { data: currentUserData } = useGetCurrentUserQuery({ accessToken });

  const { data: permissionsOfUsers } = useGetAllPermissionQuery(
    currentUserData?.id ?? ""
  );
  const hasPermission = (permission: string) => {
    // Check if permissionsOfUsers is defined
    if (permissionsOfUsers) {
      // Explicitly assert the type to be an array of strings
      const permissionsArray = permissionsOfUsers as string[];
      return permissionsArray.includes(permission);
    } else {
      // Handle the case where permissionsOfUsers is undefined
      return false;
    }
  };

  const { userId } = useParams();
  const navigate = useNavigate();
  const [deleteAccountMutation] = useDeleteAccountMutation();

  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const {
    data: userData,
    error,
    refetch,
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
  const handleDeleteConfirmation = (id: any) => {
    setDeleteUserId(id);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteAccountMutation(id);
      refetch();
      toast.success("User deleted successfully");
      navigate("/AdminLoginPage/AdminPage/UserPage");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    } finally {
      setDeleteUserId(null);
    }
  };
  const { userName, email, phoneNumber, roles } = userData;

  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, ml: 2 }}>
          {userName}
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: 40 }}
          onClick={(event) => {
            if (hasPermission("Edit User")) {
              navigate(`/AdminLoginPage/AdminPage/UserPage/EditUser/${userId}`);
            } else {
              console.log("Permission denied: Edit User");
            }
            event.stopPropagation();
          }}
          disabled={!hasPermission("Edit User")}
        >
          <CreateIcon sx={{ mr: 2 }}></CreateIcon> EDIT
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={(event) => {
            if (hasPermission("Delete User")) {
              handleDeleteConfirmation(userId);
              event.stopPropagation();
            } else {
              console.log("Permission denied: Delete User");
            }
            event.stopPropagation();
          }}
          disabled={!hasPermission("Delete User")}
        >
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
        <Typography variant="h5" sx={{ color: "black" }}>
          List of Roles
        </Typography>
        <Table sx={{ border: "1px solid #ddd", borderRadius: 8 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
              <TableCell sx={{ ml: 1, color: "black" }}>
                <Typography variant="h6">Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid #ddd" }}>
            {Array.isArray(roles) && roles.length > 0 ? (
              roles.map((roles) => (
                <TableRow key={roles}>
                  <TableCell sx={{ color: "black" }}>
                    <Box sx={{ mb: 1 }}>
                      {/* Use RoleName component here */}
                      <RoleName role={roles} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1} sx={{ color: "black" }}>
                  No roles assigned
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Dialog
        open={Boolean(deleteUserId)}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteUserId && handleDelete(deleteUserId)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function RoleName({ role }: { role: string | string[] }) {
  // Ensure role is an array
  const roleArray = Array.isArray(role) ? role : [role];

  const roleIds = roleArray.map((role: any) => role.id).join(',');

  const {
    data: roleNameData,
    error: roleNameError,
    isLoading: roleNameIsLoading,
  } = useGetRoleNameQuery(roleIds);

  if (roleNameIsLoading) {
    return <Box>Loading role name...</Box>;
  }

  if (roleNameError) {
    return <Box>Error loading role name</Box>;
  }

  // Check if roleNameData is defined and has a name property
  const roleName = roleNameData?.name || "Role Name Not Found";

  return <div>{roleName}</div>;
}



export default ViewUser;

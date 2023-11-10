import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import { useGetAllUserQuery } from "../store/service/getUser.service";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAccountMutation } from "../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

interface UserData {
  email: string;
  userName: string;
  phoneNumber: number;
  roleIds: string;
  id: string;
}

export default function UserPage() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const { data: usersData, refetch } = useGetAllUserQuery();
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isParentRoute = location.pathname === "/AdminPage/UserPage";
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "userName", headerName: "Username", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "userRoles", headerName: "User Role", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 20,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            navigate(`/AdminPage/UserPage/EditUser/${params.id}`);
            event.stopPropagation();
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 20,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            handleDeleteConfirmation(params.id);
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = usersData
    ? usersData.data.map((user: UserData) => ({
        id: user.id,
        email: user.email,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        userRoles: user.roleIds,
      }))
    : [];

  const options = [
    "Export to Excel(All found)",
    "Export to Excel(selected)",
    "Export to CSV(All found)",
    "Export to CSV(selected)",
  ];

  const handleMenuItemClick = (
    _event: React.MouseEvent | MouseEvent | TouchEvent,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteAccountMutation(id);
      refetch();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    } finally {
      setDeleteUserId(null);
    }
  };
  const handleDeleteConfirmation = (id: any) => {
    setDeleteUserId(id);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    console.log("data", usersData);
  };

  const handleClose = (event: React.MouseEvent | MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredRows = rows.filter((row: UserData) => {
    const rowData = Object.values(row).join(" ").toLowerCase();
    return rowData.includes(searchQuery.toLowerCase());
  });
  return (
    <>
      <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
        {isParentRoute && (
          <>
            <Typography sx={{ fontSize: "h3.fontSize" }}>USER</Typography>
            <Box
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/AdminPage/UserPage/CreateUser");
                }}
              >
                CREATE NEW USER
              </Button>

              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button sx={{ marginLeft: 1 }}>EXPORT</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ marginLeft: 1 }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchInputChange}
                sx={{ marginLeft: 1 }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
            </Box>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                  {
                    color: "black",
                  },
              }}
              onRowClick={(params: any) => {
                navigate(`/AdminPage/UserPage/ViewUser/${params.id}`);
              }}
            />
          </>
        )}

        <ToastContainer />
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
      <Outlet></Outlet>
    </>
  );
}

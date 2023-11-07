import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import GroupIcon from "@mui/icons-material/Group";
import Collapse from "@mui/material/Collapse";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyIcon from "@mui/icons-material/Key";
import { DataGrid } from "@mui/x-data-grid";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openDropDown, setOpenDropDown] = React.useState(false);

  const handleClick = () => {
    setOpenDropDown(!openDropDown);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
  ];

  const rows = [
    {
      id: 1,
      email: "Snow",
      userName: "Jon",
      phoneNumber: 35,
      userRoles: "admin",
    },
    // {
    //   id: 2,
    //   email: "Lannister",
    //   userName: "Cersei",
    //   phoneNumber: 42,
    //   userRoles: "admin",
    // },
    // {
    //   id: 3,
    //   email: "Lannister",
    //   userName: "Jaime",
    //   phoneNumber: 45,
    //   userRoles: "admin",
    // },
    // {
    //   id: 4,
    //   email: "Stark",
    //   userName: "Arya",
    //   phoneNumber: 16,
    //   userRoles: "admin",
    // },
    // {
    //   id: 5,
    //   email: "Targaryen",
    //   userName: "Daenerys",
    //   phoneNumber: null,
    //   userRoles: "admin",
    // },
    // {
    //   id: 6,
    //   email: "Melisandre",
    //   userName: null,
    //   phoneNumber: 150,
    //   userRoles: "admin",
    // },
    // {
    //   id: 7,
    //   email: "Clifford",
    //   userName: "Ferrara",
    //   phoneNumber: 44,
    //   userRoles: "admin",
    // },
    // {
    //   id: 8,
    //   email: "Frances",
    //   userName: "Rossini",
    //   phoneNumber: 36,
    //   userRoles: "admin",
    // },
    // {
    //   id: 9,
    //   email: "Roxie",
    //   userName: "Harvey",
    //   phoneNumber: 65,
    //   userRoles: "admin",
    // },
  ];
  const handleNavigateHome = () => {
    navigate("/AdminPage");
  };
  const handleNavigate = () => {
    navigate("/AdminPage/UserPage");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <MuiAppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItemButton onClick={handleNavigateHome}>
            <HomeIcon />
            <ListItemText primary={"Home"} sx={{ marginLeft: "20px" }} />
          </ListItemButton>
          <Divider sx={{ padding: 1 }}></Divider>
          <ListItemButton onClick={handleClick}>
            <ManageAccountsIcon />

            <ListItemText primary="Account" sx={{ marginLeft: "20px" }} />
            {openDropDown ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDropDown} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleNavigate}>
                <GroupIcon />
                <ListItemText primary="User" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <SettingsIcon />
                <ListItemText primary="Role" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <AdminPanelSettingsIcon />
                <ListItemText primary="Policy" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <KeyIcon />
                <ListItemText
                  primary="Permission"
                  sx={{ marginLeft: "20px" }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <div
        style={{
          height: 400,
          width: "100%",
          marginTop: 100,
          marginRight: "5%",
          marginLeft: "5%",
        }}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        <DataGrid
          rows={rows}
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
        />
      </div>
    </Box>
  );
}

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

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyIcon from "@mui/icons-material/Key";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";

export default function PersistentDrawerLeft() {
  const drawerWidth = 240;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openDropDown, setOpenDropDown] = React.useState(true);

  const handleClick = () => {
    setOpenDropDown(!openDropDown);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigateHome = () => {
    navigate("/AdminPage");
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
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate("/AdminPage/UserPage");
                }}
              >
                <GroupIcon />
                <ListItemText primary="User" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate("/AdminPage/RolePage");
                }}
              >
                <SettingsIcon />
                <ListItemText primary="Role" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate("/AdminPage/PolicyPage");
                }}
              >
                <AdminPanelSettingsIcon />
                <ListItemText primary="Policy" sx={{ marginLeft: "20px" }} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate("/AdminPage/PermissionSetPage");
                }}
              >
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
    </Box>
  );
}

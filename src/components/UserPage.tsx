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

  const { data: usersData } = useGetAllUserQuery();

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
      renderCell: () => (
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 20,
      renderCell: () => (
        <IconButton color="primary">
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
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained">CREATE NEW USER</Button>
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
                        onClick={(event) => handleMenuItemClick(event, index)}
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
      />
    </Box>
  );
}

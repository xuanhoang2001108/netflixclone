import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetPermissionSetQuery } from "../../../store/service/getUser.service";
import { Outlet, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";

function PolicyPage() {
  const { data: permissionSetData } = useGetPermissionSetQuery();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isParentRoute =
    location.pathname === "/AdminLoginPage/AdminPage/PolicyPage";
  const handleNavigate = () => {
    navigate("/AdminLoginPage/AdminPage/PolicyPage/CreatePolicy");
  };

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filterPermissionRows = permissionSetData?.data?.filter(
    (permissionSet: any) =>
      permissionSet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(permissionSetData);
  return (
    <>
      <Box
        sx={{
          marginLeft: "20%",
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isParentRoute && (
          <>
            <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "h3.fontSize" }}>
                  Policies
                </Typography>
                <Button
                  variant="contained"
                  sx={{ height: 40, ml: 86 }}
                  onClick={handleNavigate}
                >
                  + CREATE NEW POLICY
                </Button>
              </Box>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchInputChange}
                sx={{ marginLeft: 81, width: 400 }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
              <Typography variant="h6" sx={{ mr: 2 }}>
                {permissionSetData?.data?.length} Policies
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {filterPermissionRows && filterPermissionRows.length > 0 ? (
                filterPermissionRows.map((permission: any) => (
                  <Box
                    sx={{
                      borderRadius: 4,
                      border: "1px solid black",
                      width: "250px",
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                  
                      marginBottom: 2,
                      marginLeft: 2,
                    }}
                    onClick={() =>
                      navigate(
                        `/AdminLoginPage/AdminPage/PolicyPage/ViewPolicy/${permission.id}`
                      )
                    }
                    key={permission.id}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h5">{permission.name}</Typography>
                        <div
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1, // Limit to 5 lines
                            textOverflow: "ellipsis",
                          }}
                        >
                          {permission.description}
                        </div>
                          <div className="flex flex-row mt-2">
                            <hr></hr>
                            <div className="bg-purple-600 text-sm text-white rounded-full p-1 ">
                              (
                              {permission.permissions
                                ? permission.permissions.length
                                : 0}
                              ) permissions
                            </div>
                          </div>
                          </Box>
                        </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="h5">
                  No matching policies found.
                </Typography>
              )}
            </Box>
          </>
        )}
        <Outlet />
      </Box>
    </>
  );
}

export default PolicyPage;

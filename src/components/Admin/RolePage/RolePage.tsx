import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetRoleQuery } from "../../../store/service/getUser.service";
import { Outlet, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";

function RolePage() {
  const { data: roleData } = useGetRoleQuery();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isParentRoute = location.pathname === "/AdminPage/RolePage";
  const handleNavigate = () => {
    navigate("/AdminPage/RolePage/CreateRole");
  };

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const filteredRoles = roleData?.data.filter((role: any) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
                <Typography sx={{ fontSize: "h3.fontSize" }}>Role</Typography>
                <Button
                  variant="contained"
                  sx={{ height: 40, ml: 98 }}
                  onClick={handleNavigate}
                >
                  CREATE NEW ROLE
                </Button>
              </Box>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchInputChange}
                sx={{ marginLeft: 80, mb: 2, width: 400 }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
              <Typography variant="h6" sx={{ mr: 2 }}>
                {roleData?.data.length} ROLES
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {filteredRoles && filteredRoles.length > 0 ? (
                filteredRoles.map((role: any) => (
                  <Box
                    sx={{
                      borderRadius: 4,
                      border: "1px solid black",
                      width: "250px",
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                      marginLeft: 2,
                    }}
                    onClick={() =>
                      navigate(`/AdminPage/RolePage/ViewRole/${role.id}`)
                    }
                    key={role.id}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h5">{role.name}</Typography>
                      <div className="flex flex-row mt-20">
                        <div className="bg-purple-600 text-sm text-white rounded-full p-1 ">
                          permissionssets (
                          {role.permissionSetIds
                            ? role.permissionSetIds.length
                            : 0}
                          )
                        </div>
                        <div className="ml-2 bg-purple-600 text-sm text-white rounded-full p-1 ">
                          users ({role.userIds ? role.userIds.length : 0})
                        </div>
                      </div>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="h5">No matching roles found.</Typography>
              )}
            </Box>
          </>
        )}
      </Box>
      <Outlet></Outlet>
    </>
  );
}

export default RolePage;

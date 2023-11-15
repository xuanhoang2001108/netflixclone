import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetRoleQuery } from "../store/service/getUser.service";
import { Outlet, useNavigate } from "react-router-dom";

function RolePage() {
  const { data: roleData } = useGetRoleQuery();
  const navigate = useNavigate();

  const isParentRoute = location.pathname === "/AdminPage/RolePage";
  const handleNavigate = () => {
    navigate("/AdminPage/RolePage/CreateRole");
  };
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
                  sx={{ height: 40, ml: 2 }}
                  onClick={handleNavigate}
                >
                  CREATE NEW ROLE
                </Button>
              </Box>
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
              {roleData && roleData.data.length > 0 ? (
                roleData.data.map((role: any) => (
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
                    key={role.id}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h5">{role.name}</Typography>
                      <div className="flex flex-row mt-20">
                        <hr></hr>
                        <div className="bg-purple-600 text-sm text-white rounded-full p-1 ">
                          permissionssets ({role.permissionSetIds.length})
                        </div>
                        <div className="ml-2 bg-purple-600 text-sm text-white rounded-full p-1 ">
                          users ({role.userIds.length})
                        </div>
                      </div>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="h5">Loading...</Typography>
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

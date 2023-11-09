import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetRoleQuery } from "../store/service/getUser.service";
import Divider from "@mui/material/Divider";

function RolePage() {
  const { data: roleData } = useGetRoleQuery();

  return (
    <Box
      sx={{
        marginLeft: "20%",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
        <Typography sx={{ fontSize: "h3.fontSize" }}>Role</Typography>
        <Button variant="contained">CREATE NEW ROLE</Button>
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
              onMouseEnter={() => console.log(role)}
              key={role.id}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5">{role.name}</Typography>
                <hr></hr>
                <Typography variant="h6">
                  users {role.permissionSetIds.length}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="h5">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
}

export default RolePage;

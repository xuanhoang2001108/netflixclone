import Box from "@mui/material/Box";

import { ToastContainer } from "react-toastify";

import TabsWrappedLabel from "./TabsWrappedLabel";

export default function CreateUser() {
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <TabsWrappedLabel />

      <ToastContainer />
    </Box>
  );
}

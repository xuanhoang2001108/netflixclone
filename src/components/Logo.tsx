import Box, { BoxProps } from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

export default function Logo({ sx }: BoxProps) {
  return (
    <RouterLink to={"/"}>
      <Box
        component="img"
        alt="Netflix Logo"
        src="src/assets/netflix-logo.png"
        width={87}
        height={25}
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
}

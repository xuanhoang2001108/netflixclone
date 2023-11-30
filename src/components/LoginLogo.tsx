import Box, { BoxProps } from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

export default function Logo({ sx }: BoxProps) {
  return (
    <RouterLink to={"/"}>
      <Box
        component="img"
        alt="Netflix Logo"
        src="/assets/netflix-logo.png"
        width={174}
        height={50}
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
}

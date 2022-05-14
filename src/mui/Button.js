import colorPalette from "../constants/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const AuthButton = styled(Button)({
  backgroundColor: colorPalette.primaryAccentColor,
  fontWeight: "600",
  "&:hover": {
    backgroundColor: colorPalette.primaryAccentColor,
  },
});

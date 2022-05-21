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

export const CreateTaskButton = styled(Button)({
  backgroundColor: colorPalette.primaryAccentColor,
  color: "#ffffff",
  textTransform: "none",
  width: "auto",
  fontWeight: "600",
  position: "relative",
  top: "0",
  transition: "top 250ms ease",
  boxShadow:
    "0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
  "&:hover": {
    backgroundColor: colorPalette.primaryAccentColor,
    top: "-4px",
  },
});

import colorPalette from "../constants/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const SubmitButton = styled(Button)({
  backgroundColor: colorPalette.primaryAccentColor,
  color: "#ffffff",
  textTransform: "none",
  width: "100%",
  fontSize: "1em",
  fontWeight: "600",
  position: "relative",
  top: "0",
  transition: "top 250ms ease",
  fontFamilt: '"Source Sans Pro", sans-serif',
  "&:hover": {
    backgroundColor: colorPalette.primaryAccentColor,
    top: "-4px",
  },
});

import colorPalette from "../constants/colors";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";

export const AuthInput = styled(Input)({
  "&:hover:not(.Mui-focused):before": {
    borderBottomColor: colorPalette.primaryAccentColor,
  },
  "&:before": {
    borderBottomColor: colorPalette.primaryAccentColor,
  },
  "&:after": {
    borderBottomColor: colorPalette.primaryAccentColor,
  },
});

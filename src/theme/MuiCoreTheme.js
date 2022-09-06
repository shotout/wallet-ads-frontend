import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import appTheme from "./core-theme/appTheme";

// ----------------------------------------------------------------------

MuiCoreTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MuiCoreTheme({ children }) {
  
const theme = createTheme({
  ...appTheme('myfitsociety', 'light')
});

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

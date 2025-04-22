"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { chartsCustomizations } from "./customization/charts";

import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { dataDisplayCustomizations } from "./customization/dataDisplay";
import { dataGridCustomizations } from "./customization/dataGrid";
import { surfacesCustomizations } from "./customization/surfaces";
import { datePickersCustomizations } from "./customization/datePickers";
import { navigationCustomizations } from "./customization/navigation";
import { inputsCustomizations } from "./customization/inputs";
import { feedbackCustomizations } from "./customization/feedback";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  colorSchemes,
  typography,
  shadows,
  shape,
  components: {
    ...chartsCustomizations,
    ...dataDisplayCustomizations,
    ...surfacesCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...navigationCustomizations,
    ...inputsCustomizations,
    ...feedbackCustomizations,
  },
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultMode={"system"} theme={theme}>
      {children}
    </ThemeProvider>
  );
}

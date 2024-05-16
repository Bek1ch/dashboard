import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import IframePage from "./scenes/pavodki";
// import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "react-widgets/styles.css";
import LoginPage from "./scenes/auth";
import ProtectedRoute from "./scenes/auth/ProtectedRoute";
import EKCLayout from "./layout/EKCLayout";
import DivisionsPage from "./scenes/divisions";
import MainLayout from "./layout/MainLayout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<IframePage />} />
              <Route path="ekc" element={<EKCLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="table" element={<DivisionsPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<h2>404 - Not Found</h2>} />
          {/* <Route path="/form" element={<Form />} /> */}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import PodrPage from "./scenes/podr";
import IframePage from "./scenes/pavodki";
// import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "react-widgets/styles.css";
import LoginPage from "./scenes/auth";
import ProtectedRoute from "./scenes/auth/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<IframePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route
                path="*"
                element={<h2>404 - Not Found</h2>}
              />
              {/* <Route path="/podrazdeleniya" element={<PodrPage />} /> */}
              {/* <Route path="/form" element={<Form />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

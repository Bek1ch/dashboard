import { Box, IconButton, useTheme, Typography, Icon } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import logo from "../../assets/logo.jpg";
// import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LogoutButton from "../../utils/logout";
const Topbar = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "none",
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderColor: "#ccc",
        paddingBottom: "0.1px",
        background: "#142D5C",
      }}
    >
      <img
        src={logo}
        alt="Логотип"
        style={{ height: "80px", marginRight: "20px" }}
      />
      <Typography
        style={{
          flexGrow: 1,
          fontSize: "1.5rem",
          marginLeft: "10px",
          color: "white",
        }}
      >
        Панель мониторинга Министерства промышленности и строительства
        Республики Казахстан
      </Typography>
      <LogoutButton />

      {/* <IconButton onClick={colorMode.toggleColorMode} style={{ marginRight: '10px', fontSize: '2rem' }}>
    {theme.palette.mode === "dark" ? (
      <LightModeOutlinedIcon color="white"/>
    ) : (
      <DarkModeOutlinedIcon style={{ color: 'white' }}/>
    )}
  </IconButton> */}
    </div>
  );
};

export default Topbar;

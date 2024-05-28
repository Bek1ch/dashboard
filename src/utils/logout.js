import React from "react";
import { useNavigate } from "react-router-dom";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { TokenService } from "./token.service";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    TokenService.removeToken();

    navigate("/login");
  };

  return (
    <ExitToAppRoundedIcon
      style={{
        marginRight: "15px",
        color: "white",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={handleLogout} // Добавляем обработчик событий
    />
  );
};

export default LogoutButton;

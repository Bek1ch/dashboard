import { Outlet, Navigate } from "react-router-dom";
import { TokenService } from "../../utils/token.service";

const ProtectedRoute = () => {
  const user = TokenService.getToken();
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;

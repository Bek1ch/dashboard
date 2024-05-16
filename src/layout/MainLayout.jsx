import { Outlet } from "react-router-dom";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

const MainLayout = () => {
  return (
    <>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;

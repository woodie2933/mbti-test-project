import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-14">
        {children}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";

import Navbar from "./Nav";
import Footer from "./Footer";
import CompareBar from "./CompareBar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <CompareBar />

      <Footer />
    </>
  );
}

export default MainLayout;
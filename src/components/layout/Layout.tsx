import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
import { Outlet } from "react-router-dom";
import Navbar from "../Components/User/Reuseable/Navbar";
import Footer from "../Components/User/Reuseable/Footer";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
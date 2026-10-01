import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Home from "./Pages/User/Home";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add: /internships, /internships/:id, /about, /student/* ... */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
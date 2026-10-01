import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import ProtectedRoute from "./Components/Reuseable/ProtectedRoute";
import Home from "./Pages/User/Home";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Internships from "./Pages/User/Internships";
import "./index.css";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import MyApplications from "./Pages/Student/MyApplications";
import Recommendations from "./Pages/Student/Recommendations";
import StudentProfile from "./Pages/Student/StudentProfile";
import EmployerDashboard from "./Pages/Employer/EmployerDashboard";
import EmployerInternships from "./Pages/Employer/EmployerInternships";
import EmployerInternshipForm from "./Pages/Employer/EmployerInternshipForm";
import EmployerApplicants from "./Pages/Employer/EmployerApplicants";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/internships" element={<Internships />} />
          {/* Add later: /internships/:id */}

          {/* Student only */}
          {/* <Route element={<ProtectedRoute roles={["student"]} />}> */}
          <Route >
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/applications" element={<MyApplications />} />
            <Route path="/student/recommendations" element={<Recommendations />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>

          {/* <Route element={<ProtectedRoute roles={["employer"]} />}> */}
          <Route>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/internships" element={<EmployerInternships />} />
            <Route path="/employer/internships/new" element={<EmployerInternshipForm />} />
            <Route path="/employer/internships/:id/edit" element={<EmployerInternshipForm />} />
            <Route path="/employer/applicants" element={<EmployerApplicants />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
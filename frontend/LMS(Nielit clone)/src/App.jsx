import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import CoursesDetails from "./pages/CoursesDetails";
import AuthPage from "./components/AuthPage";
import Centreform from "../src/pages/Centre.form";
import ESform from "../src/pages/ES.form";
import ESExamCentreform from "../src/pages/ES.Exam.Centre.form";
import Webdevelopment from "./pages/Web-development";
import Cybersecurity from "./pages/Cyber-security";
import Datascience from "./pages/Data-science";
import Internetofthings from "./pages/Internet-of-things";
import RegisterationForm from "./pages/RegistrationForm";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import EnrollCourses from "./pages/EnrollCourses";
import Profile from "./pages/Profile";
import ChatBot from "./pages/ChatBot";

// Layout component for Sidebar and nested routes
const LayoutWithSidebar = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

const App = () => {
  return (
    <>
      <Navbar />
      <ChatBot/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/examportal" element={<Centreform />} />
        <Route path="/examportal/examsuperintendent" element={<ESform />} />
        <Route path="/examportal/esexamcentre" element={<ESExamCentreform />} />
        <Route path="/signinform" element={<AuthPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course/:id" element={<CoursesDetails />} />
        <Route path="/courses/web-development" element={<Webdevelopment />} />
        <Route path="/courses/cybersecurity" element={<Cybersecurity />} />
        <Route path="/courses/data-science" element={<Datascience />} />
        <Route
          path="/courses/internet-of-things"
          element={<Internetofthings />}
        />
        <Route path="/registerform" element={<RegisterationForm />} />

        {/* Nested routes with Sidebar */}
        <Route element={<LayoutWithSidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enrollcourses" element={<EnrollCourses />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
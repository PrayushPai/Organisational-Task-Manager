import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import UserProfile from "./components/users/UserProfile";
import InstituteDashboard from "./components/users/InstituteDashboard";
import UserTasks from "./components/common/UserTasks";
import SubmitTask from "./components/common/SubmitTask";
import ReviewTask from "./components/common/ReviewTask";
import BreakdownTask from "./components/common/BreakdownTask";
import ChildrenTask from "./components/common/ChildrenTask";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  let user = sessionStorage.getItem("usertype");
  if (user === "I") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="institute/profile" element={<InstituteDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  if (user === "U") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/tasks" element={<UserTasks />} />
            <Route path="user/tasks/submit" element={<SubmitTask />} />
            <Route path="user/tasks/review" element={<ReviewTask />} />
            <Route path="user/tasks/breakdown" element={<BreakdownTask />} />
            <Route path="user/tasks/children" element={<ChildrenTask />} />

          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

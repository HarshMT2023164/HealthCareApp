import "./App.css";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserDetailsProvider } from "./utils/Context/UserContext";
import { SupervisorProvider } from "./utils/Context/SupervisorContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is the login page
  const isLoginUrl = location.pathname === "/";

  // If the current route is the login page, redirect to /login
  // useEffect(() => {
  //   if (isLoginUrl) {
  //     navigate("/");
  //   }
  // }, [isLoginUrl, navigate]);

  return (
    <SupervisorProvider>
    <UserDetailsProvider>
      <div className="list-page-item">
        <Outlet />
      </div>
    </UserDetailsProvider>
    </SupervisorProvider>
  );
}

export default App;

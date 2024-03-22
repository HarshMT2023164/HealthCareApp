import "./App.css";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { useEffect } from "react";
import { UserDetailsProvider } from "./utils/Context/UserContext";

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
    <UserDetailsProvider>
    <div className="list-page">
      <div className="list-page-item">{!isLoginUrl && <NavBar />}</div>
      <div className="list-page-item">
        <Outlet />
      </div>
    </div>
    </UserDetailsProvider>
  );
}

export default App;

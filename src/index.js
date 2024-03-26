import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterForm from './Components/Admin/RegisterForm';
import RoleCards from './Components/Admin/RoleCards';
import { ViewListMain } from './Components/Admin/ViewListMain';
import Login from './Components/Authentication/Login';
import AreawisePatientsMain from './Components/Supervisor/AreawisePatientsMain';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Supervisor from './Components/Supervisor/Supervisor';
import SupervisorHome from './Components/Supervisor/SupervisorHome';

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Login/>
      },
      {
        path : "/roles",
        element : <RoleCards />
      },
      {
        path : "/viewList/:role",
        element : <ViewListMain />
      },
      {
        path : "/register/:role",
        element : <RegisterForm />
      },
      {
        path :"/Supervisor/AreaPatientlist",
        element : <AreawisePatientsMain />
      },
      {
        path:"/supervisor",
        element : <Supervisor/>,
        children :[
          {
            path: "/supervisor",
            element: <SupervisorHome/>
          },
        ]
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router = {appRouter }/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

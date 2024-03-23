import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import RegisterForm from './Components/Admin/RegisterForm';
import { ViewListMain } from './Components/Admin/ViewListMain';
import RoleCards from './Components/Admin/RoleCards';
import DoctorMain from './Components/Doctor/DoctorMain';

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
        path : "doctor",
        element : <DoctorMain />,
      }
    ]
  }
])

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

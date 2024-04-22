import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterForm from './Components/Admin/RegisterForm';
import RoleCards from './Components/Admin/RoleCards';
import { ViewListMain } from './Components/Admin/ViewListMain';
import Login from './Components/Authentication/Login';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import DoctorLandingScreen from './Components/Doctor/DoctorLandingScreen';
import DoctorMain from './Components/Doctor/DoctorMain';
import PatientHistory from './Components/Doctor/PatientHistory';
import PatientQuestionnaire from './Components/Doctor/PatientQuestionnaire';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Profile from './Components/Doctor/Profiile';

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
        path : "/doctor",
        element : <DoctorMain />,
        children : [
          {
            path : "/doctor/landingScreen",
            element : <DoctorLandingScreen />
          },
          {
            path : "/doctor/viewQuestionnaire",
            element : <PatientQuestionnaire />
          },
          {
            path : "/doctor/dashboard",
            element : <DoctorDashboard />
          },
          {
            path : "/doctor/history",
            element : <PatientHistory />
          },
          {
            path : "/doctor/profile",
            element : <Profile />
          },
          // {
          //   path : "/doctor/add-presctiprion",
          //   element : <PrescriptionForm />
          // },
          // {
          //   path : "/doctor/add-followup",
          //   element : <FollowUpForm />
          // },

        ]
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

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
import AreawisePatientsMain from './Components/Supervisor/AreawisePatientsMain';
import FHWListMain from './Components/Supervisor/FHWListMain';
import ProfilePage from './Components/Supervisor/ProfilePage';
import Supervisor from './Components/Supervisor/Supervisor';
import SupervisorHome from './Components/Supervisor/SupervisorHome';
import './index.css';

import Admin from './Components/Admin/Admin';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ResetPassword from './Components/Authentication/ResetPassword.js';
import SetPassword from './Components/Authentication/SetPassword.js';


import ReceptionistMain from './Components/Receptionist/ReceptionistMain.js';
import DoctorsListMain from './Components/Receptionist/DoctorsListMain.js';
import PatientsListMain from './Components/Receptionist/PatientsListMain.js'
import ReceptionistProfilePage from './Components/Receptionist/ReceptionistProfilePage.js'
import AssignListMain from './Components/Admin/AssignListMain.js'
import Dashboard from './Components/Dashboard/Dashboard.js';

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/dashboard",
        element : <Dashboard/>
      },
      {
        path : "/",
        element : <Login/>
      },
      {
        path : "/forgotPassword",
        element : <ForgotPassword/>
      },
      {
        path : "/resetPassword",
        element : <ResetPassword/>
      },
      {
        path : "/setPassword",
        element : <SetPassword/>
      },

      {
        path:"/admin",
        element:<Admin/>,
        children:[
          {
            path : "/admin/roles",
            element : <RoleCards />
          },
          {
            path : "/admin/viewList/:role",
            element : <ViewListMain />
          },
          {
            path : "/admin/register/:role",
            element : <RegisterForm />
          },
          {
            path : "/admin/assignList/:role",
            element : <AssignListMain/>
          },
        ]
      },
      {
        path:"/supervisor",
        element : <Supervisor/>,
        children :[
          {
            path: "/supervisor/home",
            element: <SupervisorHome/>
          },
          {
            path :"/supervisor/AreaPatientlist",
            element : <AreawisePatientsMain />
          },
          {
            path:"/supervisor/FHWList",
            element:<FHWListMain/>
          },
          {
            path:"/supervisor/Profile",
            element:<ProfilePage/>
          }
        ]
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
      },
      {
        path:"/receptionist",
        element : <ReceptionistMain/>,
        children :[
          {
            path: "/receptionist/home",
            element: <PatientsListMain/>
          },
          {
            path :"/receptionist/doctors",
            element : <DoctorsListMain />
          },
          {
            path:"/receptionist/Profile",
            element:<ReceptionistProfilePage/>
          },
        ]
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

     <RouterProvider router = {appRouter }/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

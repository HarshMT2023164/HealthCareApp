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
import PrescriptionForm from './Components/Doctor/PrescriptionForm';
import DoctorLandingScreen from './Components/Doctor/DoctorLandingScreen';
import FollowUpForm from './Components/Doctor/FollowUpForm';
import PatientQuestionnaire from './Components/Doctor/PatientQuestionnaire';

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
            path : "/doctor",
            element : <DoctorLandingScreen />
          },
          {
            path : "/doctor/viewQuestionnaire",
            element : <PatientQuestionnaire />
          }
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

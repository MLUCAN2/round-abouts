import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Activities from './pages/Activities.jsx';
import CreateTrip from './pages/CreateTrip.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Trips from './pages/Trips.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>, 
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/activities',
        element: <Activities/>
      },
      {
        path: '/createTrip',
        element: <CreateTrip/>
      },
      {
      path: '/login',
      element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path:'/trips',
        element: <Trips/>
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <RouterProvider router={router} />  

)

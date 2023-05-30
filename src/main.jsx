import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Findjobs from './components/Findjobs/Findjobs';
import Postajob from './components/Postjobs/Postajob';
import ViewDetails from './components/ViewDetails/ViewDetails';
import Myjobs from './components/Myjobs/Myjobs';
import AppliedJobs from './components/AppliedJobs/AppliedJobs';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AuthProvider from './components/AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './index.css'
import UpdateJobs from './components/UpdateJobs/UpdateJobs';
import ErrorPage from './components/ErrorPage/ErrorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {  
      path:'/findjobs',
      element: <Findjobs/>,

      },
      {  
        path:'/findjobs/:catg',
        element: <Findjobs/>,
  
        },
      {  
        path:'/postjob',
        element: <Postajob/>,
  
        },
        {  
          path:'/myjobs',
          element: <Myjobs/>,
         
          },
          {  
            path:'/appliedjobs',
            element: <AppliedJobs/>

      
            },
  
       

        {  
          path:'/details/:id',
          element: <PrivateRoute><ViewDetails/></PrivateRoute>,
          loader:({params})=> fetch(`https://job-server-eight.vercel.app/jobs/${params.id}`)
          },
          {  
            path:'/updatejobs/:id',
            element: <UpdateJobs/>,
            loader:({params})=> fetch(`https://job-server-eight.vercel.app/jobs/${params.id}`)
            },
    ]
  },


  {  
    path:'/login',
    element: <Login/>


    },
    {  
      path:'/signup',
      element: <Signup/>


      },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<div className='container-fluid'>
  <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

</div>
  </React.StrictMode>,
)

import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdPlace} from "react-icons/md";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ViewDetails() {
  const data = useLoaderData();
const{user}=useContext(AuthContext)
const [appliedJobs,setAppliedJobs]=useState([])

useEffect(()=>{
  fetch(`https://job-server-eight.vercel.app/appliedjobs?email=${user?.email}`,{
    method:'GET',
    headers:{
      authorization:`Bearer ${localStorage.getItem('job-access-token')}`
    }
  }

  )
  .then(res=>res.json())
  .then(data=>setAppliedJobs(data))
},[user,appliedJobs])

let handleApply=(data)=>{
  const alreadyApplied = appliedJobs.some((job) => job.jobtitle === data.jobtitle);

  if (alreadyApplied) {
    return toast("Already applied");
  }

  delete data._id
  fetch('https://job-server-eight.vercel.app/appliedjobs',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({...data,useremail:user?.email})
  })
  .then(res=>res.json())
  .then(data=>toast("Applied Successfully"))
  .catch((error) => {
    console.error(error);
    toast.error('Failed to apply');
  });
}


  return (
    <div className='container mt-5'>
       <ToastContainer />
      <div className='row'>
        <div className='col-12 col-md-9'>
          <div className='mt-5'>
            <p >
              <span className='fw-bold '>Job description: </span>
              {data.description}
            </p>
            <p className='mt-5'>
              <span className='fw-bold'>Job requirements: </span>
              {data.requirements}
            </p>
          </div>
        </div>
        <div className='col-12 col-md-3'>
          <div style={{backgroundColor:'#F6F7F8'}} className='p-3 rounded' >
           <div className='text-center'>
           <img src={data.companyimg}     className='img-fluid rounded-circle'
              style={{ objectFit: 'cover', width: '150px', height: '150px' }}alt='Company Logo' />

           </div>
            <h4 className='mt-3'>{data.name}</h4>
            <h6>{data.jobtitle}</h6>

            <p className='text-secondary'>{data.email}</p>
            <p className='d-flex justify-content-between align-items-center'>
            <span>Location:</span>
              <span  className='d-flex justify-content-between align-items-center gap-2'><MdPlace className='text-secondary'/>{data.location}</span>
     
            </p>


            
            <p  className='d-flex justify-content-between align-items-center'>
     
                <span>Salary:</span>
              <span> {data.salary}</span>
                
                </p>

            <p className='d-flex justify-content-between align-items-center'>
            <span> Type:</span>
              <span className='d-flex justify-content-between align-items-center gap-2'><BsFillBriefcaseFill className='text-secondary'/> {data.type}</span>
          
                </p>
            <p  className='d-flex justify-content-between align-items-center'>
            <span>Vacancy:</span>
              <span>{data.vacancy}</span>
   
            </p>
            <div className='text-center'>
            <button className='text-white px-5 py-2 border-0 rounded w-100 mt-3 btn btn-warning' onClick={()=>handleApply(data) }>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

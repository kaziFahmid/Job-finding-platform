import React, { useContext, useEffect, useState } from 'react'

import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdPlace} from "react-icons/md";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AppliedJobs() {
  const [appliedJobs,setAppliedJobs]=useState([])
const{user}=useContext(AuthContext)
const navigate=useNavigate()
 useEffect(()=>{
  fetch(`https://job-server-eight.vercel.app/appliedjobs?email=${user?.email}`,{
    method:'GET',
    headers:{
      authorization:`Bearer ${localStorage.getItem('job-access-token')}`
    }
  })
  .then(res=>res.json())
  .then(data=>{
    if(!data.error){
      setAppliedJobs(data)
    }
    else{
      navigate('/')
    }
  })
 },[user])
 const imgStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover',
  filter: 'brightness(70%)',
};

let handleRemove=(_id)=>{

  fetch(`https://job-server-eight.vercel.app/appliedjobs/${_id}`,{
    method:'DELETE'
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.deletedCount>0){
       
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your Applied Job has been Deleted',
  showConfirmButton: false,
  timer: 1500
})
const remaining=appliedJobs.filter((job)=>job._id!==_id)
setAppliedJobs(remaining)
console.log(data)
    }
  
  
  })
}



  return (
    <div>
      {appliedJobs.map((job)=> 
      <div key={job._id} className='card bg-white   col-md-8 mx-auto p-4 shadow-sm mt-4'>
        <div className='d-flex  gap-3  align-items-center'>
          <img src={job.companyimg} style={imgStyle} alt='Company Logo' />
          <h4>{job.jobtitle}</h4>
        </div>
        <p className='mt-2'><b>Category:</b>  {job.category}</p>
        <div className='d-flex'>
          <div className='d-flex gap-2 justify-content-center align-items-center'><BsFillBriefcaseFill className='text-secondary'/>{job.type}</div> <div className='ms-3 gap-2 d-flex justify-content-center align-items-center'><MdPlace className='text-secondary'/>{job.location}</div> <div className='ms-3'>${job.salary}</div>
        </div>

        <div className='text-center'>
   <button className='border-0 py-1 text-white rounded px-5 mt-4 btn btn-warning'>Details</button> 
   <button className='border-0 py-1 text-white rounded px-5 mt-4 btn btn-warning ms-2'onClick={()=>handleRemove(job._id)}>Remove</button>
        </div>
      </div>)}
     
    </div>
  )
}

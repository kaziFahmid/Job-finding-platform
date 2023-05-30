import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider'

import MyjobList from '../MyjobList/MyjobList'
import Swal from 'sweetalert2'

export default function Myjobs() {

  const{user}=useContext(AuthContext)
  const [myJobs,setMyJobs]=useState([])
  const [myJobsDetails,setMyJobsDetails]=useState({})
  const [id,setId]=useState('')
console.log(myJobsDetails)

  useEffect(()=>{
    fetch(`https://job-server-eight.vercel.app/jobs?email=${user?.email}`)
    .then(res=>res.json())
    .then(data=>{
      
        setMyJobs(data)
  
  })
  },[user])

  useEffect(()=>{
    fetch(`https://job-server-eight.vercel.app/jobs/${id}`)
    .then(res=>res.json())
    .then(data=>setMyJobsDetails(data))

  },[id])

  let handleGetId =(_id)=>{
    setId(_id)
  }

  let handleDelete =(_id)=>{

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {

    fetch(`https://job-server-eight.vercel.app/jobs/${_id}`,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.deletedCount>0){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        const remaining=myJobs.filter((job)=>job._id!==_id)
        setMyJobs(remaining)

      }
   
    
    })
    
  }
})
   
  }
  return (
    <div className='container_fluid'>
         <div className='row'>
      <div className='col-12 col-md-6'>
        { myJobs.map((job) => <MyjobList key={job._id} {...job} handleGetId={handleGetId}  handleDelete={handleDelete}/>)}
      </div>
      <div className='col-12 col-md-6'>
<div className=' mt-4'>

  <h2>{myJobsDetails.name}</h2>
  <h4>{myJobsDetails.jobtitle}</h4>
  <p>{myJobsDetails.location}</p>
  <p className='text-secondary'>{myJobsDetails.email}</p>
<p className='text-secondary'>{myJobsDetails.description&&<b className='text-dark'>Job Descriptions:</b>}{myJobsDetails.description}</p>
<p className='text-secondary'>{myJobsDetails.requirements&&<b className='text-dark'>Job requirements:</b>}{myJobsDetails.requirements}</p>
<p>{myJobsDetails.vacancy&&<b>Vacancy:</b>}{myJobsDetails.vacancy}</p>
<p >{myJobsDetails.type&&<b>Type:</b>}{myJobsDetails.type}</p>
</div>
      </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Category({ jobTitle, category, img }) {

  const [isHovered, setIsHovered] = useState(false);
const [jobs,setJobs]=useState([])

useEffect(()=>{
  fetch('https://job-server-eight.vercel.app/jobs')
  .then(res=>res.json())
  .then(data=>{
    
      setJobs(data)


  })
},[])
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
   <Link  className='category-link text-dark'to={`/findjobs/${category}`}>
    <div
    className={`text-center category  mx-auto mt-3 py-3 card ${
        isHovered ? 'text-warning' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={img} className='w-25 mx-auto' alt='Category Image' />
      <h3>{jobTitle}</h3>
      <p>Available Jobs({jobs.filter((x)=>x.category===category).length})</p>
    </div>
   </Link>


  );
}

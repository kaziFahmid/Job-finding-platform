import React from 'react'
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdPlace} from "react-icons/md";
import { Link } from 'react-router-dom';
export default function MyjobList({
    _id,
    companyimg,
        name,
        jobtitle,
        location,
        category,
        salary,
        type,
        vacancy,
        description,
        requirements,
        handleGetId,
        handleDelete
  }) 
  
  
  
  {

    const imgStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        filter: 'brightness(70%)',
      };
  return (
    <div>
        <div>
      <div className='card bg-white p-4 shadow-sm mt-4'>
        <div className='d-flex  gap-3  align-items-center'>
          <img src={companyimg} style={imgStyle} alt='Company Logo' />
          <h4>{jobtitle}</h4>
        </div>
        <p className='mt-2'><b>Category:</b>  {category}</p>
        <div className='d-flex'>
          <div className='d-flex gap-2 justify-content-center align-items-center'><BsFillBriefcaseFill className='text-secondary'/>{type}</div> <div className='ms-3 gap-2 d-flex justify-content-center align-items-center'><MdPlace className='text-secondary'/>{location}</div> <div className='ms-3'>${salary}</div>
        </div>

        <div className='text-center'>
   <button className='border-0 py-1 text-white rounded px-5 mt-4 btn btn-warning' onClick={()=>handleGetId(_id)}>Details</button> <button className='btn btn-danger text-white rounded mt-4 py-1'onClick={()=>handleDelete(_id)} >DELETE</button><Link to={`/updatejobs/${_id}`}>
   <button className='btn btn-dark text-white rounded mt-4 py-1 ms-1' >EDIT</button>
   </Link>
        </div>
      </div>

      
    </div>
    </div>
  )
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdPlace} from "react-icons/md";
import { AuthContext } from '../AuthProvider/AuthProvider';
export default function Jobs({
  _id,
  companyimg,
      name,
      email,
      jobtitle,
      location,
      category,
      salary,
      type,
      vacancy,
      description,
      requirements,
}) {

  const{user}=useContext(AuthContext)
    const imgStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        filter: 'brightness(70%)',
      };

  return (
    <div>
      <div className='card bg-white col-md-6 mx-auto p-4 shadow-sm mt-4'>
        <div className='d-flex  gap-3  align-items-center'>
          <img src={companyimg} style={imgStyle} alt='Company Logo' />
          <h4>{jobtitle}</h4>
        </div>
        <p className='mt-2'><b>Category:</b> {category}</p>
        <div className='d-flex'>
          <div className='d-flex gap-2 justify-content-center align-items-center'><BsFillBriefcaseFill className='text-secondary'/>{type}</div> <div className='ms-3 gap-2 d-flex justify-content-center align-items-center'><MdPlace className='text-secondary'/>{location}</div> <div className='ms-3'>${salary}</div>
        </div>
       
        <div>
{ user?.email===email? <Link to={`/updatejobs/${_id}`}><button className='btn btn-dark text-white mt-4 px-4'>Edit</button></Link> :   <Link to={`/details/${_id}`}> <button className='border-0 py-1 text-white rounded px-5 mt-4 btn btn-warning'>Apply</button></Link>}
        </div>
      </div>

      
    </div>
  );
}

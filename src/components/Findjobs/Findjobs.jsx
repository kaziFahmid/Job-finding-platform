import React, { useEffect, useRef, useState } from 'react';
import Jobs from '../Jobs/Jobs';
import { TailSpin } from  'react-loader-spinner'
import {   useParams } from 'react-router-dom';
export default function Findjobs() {
  const [jobPosts, setJobPosts] = useState([]);
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [asc, setAsc] = useState(true);
  const searchField = useRef(null);
  const{catg}=useParams()


  useEffect(() => {
    fetchJobs();
  }, [category, jobType, location, search,catg,asc]);

  const fetchJobs = () => {
    fetch(`https://job-server-eight.vercel.app/jobs?category=${catg?catg:category}&jobType=${jobType}&location=${location}&search=${search}&sort=${asc?'asc':'desc'}`)
      .then((res) => res.json())
      .then((data) => {
 
      setJobPosts(data);
      setNoResults(data.length === 0);
      setLoading(false)
     }
    )
      .catch((error) => console.log(error));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value=='All'?'':e.target.value);
    if (catg) {
      navigate('/findjobs');
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (catg) {
      navigate('/findjobs');
    }
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
    if (catg) {
      navigate('/findjobs');
    }
  };

  const handleSearchClick = () => {
    setSearch(searchField.current.value);
    if (catg) {
      navigate('/findjobs');
    }
  };

  return (
    <>
      <div className='container p-5 shadow-sm bg-white mt-4'>
        <div className='d-flex flex-column gap-md-0 gap-4 flex-md-row mx-auto mb-4'>
          <input type='text' ref={searchField} className='form-control' placeholder='Search for a job' />
          <button  className=' btn btn-warning border-0 rounded ms-md-2 text-white px-5' onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className='d-flex flex-column gap-md-0 gap-4 flex-md-row'>
          <input
            type='text'
            value={location}
            onChange={handleLocationChange}
            className='form-control mx-md-2'
            placeholder='Location'
          />

          <select
            className='form-select mx-md-2'
            name='category'
            defaultValue={catg&&catg}
            onChange={handleCategoryChange}
            aria-label='Category'
          >
            <option>Select Category</option>
            <option value='All'>All</option>
            <option value='Accounting'>Accounting</option>
            <option value='Design'>Design</option>
            <option value='Development'>Development</option>
          </select>

          <select
            className='form-select mx-md-2'
           
            onChange={handleJobTypeChange}
            aria-label='Job Type'
          >
            <option value=''>Select Job Type</option>
            <option value='Full-Time'>Full-Time</option>
            <option value='Part-Time'>Part-Time</option>
          </select>
        </div>
      </div>
      <h2 className='mt-5'>{jobPosts.length} Jobs</h2>
     
   
    {noResults ? '':<div className=' w-50 mx-auto  text-center text-md-end '>
      <button onClick={()=>setAsc(!asc)}className='btn btn-warning px-3 text-white'>{asc?'Salary High to Low ':'Salary Low to High' }</button>
    </div>}
    <TailSpin
          height="80"
          width="100%"
          
          color="rgb(255,193,7)"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{marginTop:"30px"}}
          wrapperClass=""
          visible={loading}
        />
 
      {noResults ? (
        <h3 className='text-center'>No Jobs Found</h3>
      ) : (
        jobPosts.map((job) => <Jobs key={job._id} {...job} />)
      )}
    </>
  );
}

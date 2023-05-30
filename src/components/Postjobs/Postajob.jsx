import React, { useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider'
import Swal from 'sweetalert2';
export default function Postajob() {
const{user}=useContext(AuthContext)
  let handleSubmit = (e) => {
    e.preventDefault();
    const companyimg = e.target.companyimg.value;
    const name = e.target.name.value;
    const email=e.target.email.value;
    const jobtitle = e.target.jobtitle.value;
    const location = e.target.location.value;
    const category = e.target.category.value;
    const salary = parseFloat(e.target.salary.value);
    const type = e.target.type.value;
    const description = e.target.description.value; // Added job description
    const requirements = e.target.requirements.value; // Added job requirements
    const vacancy = parseFloat(e.target.vacancy.value);
   const jobs={
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
    };

    fetch('https://job-server-eight.vercel.app/jobs',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(jobs)
    })
    .then(res=>res.json())
    .then(data=>{
     if(data.insertedId){
      Swal.fire(
        'Good job!',
        'You Posted A New Job!',
        'success'
      )
      }
    })



  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="container bg-white shadow-sm p-4 mt-5">
          <h2 className="text-center mb-4">Post a Job</h2>
         
          <div>
            <div className="d-flex">
              <div className="flex-grow-1 me-3">
                <div className="mb-3">
                  <label htmlFor="companyimg" className="form-label">
                    Company Image
                  </label>
                  <input type="text"  name="companyimg" className="form-control" id="companyimg" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" name="name" className="form-control" id="name" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                   Email
                  </label>
                  <input defaultValue={user?.email} type="email" name="email" className="form-control" id="email" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </label>
                  <input type="text" name="jobtitle" className="form-control" id="jobTitle"required />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input type="text" name="location" className="form-control" id="location" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="description"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex-grow-1">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select className="form-select"required name="category" id="category">
                    <option value="">Select Category</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <input type="number" name="salary" className="form-control" id="salary" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vacancy" className="form-label">
                    Vacancy
                  </label>
                  <input type="number" name="vacancy" className="form-control" id="vacancy"required />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <select required className="form-select" name="type" id="type">
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    className="form-control"
                    id="requirements"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning  text-white px-5 py-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

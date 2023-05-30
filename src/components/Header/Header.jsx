import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

export default function Header() {
  const {user,logOut}=useContext(AuthContext)
  let handleLogout=()=>{
    logOut()
  }
  return (
    <nav className="navbar navbar-expand-lg  shadow-sm bg-white">
    <div className="container">
    <h2  className="fw-bold"style={{color:'rgb(65,63,164)'}}>JobNexus</h2>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
          <li className="nav-item">
            <Link className="nav-link "  to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link "  to="/findjobs">Find a Job</Link>
          </li>
         {user?.email ? <li className="nav-item">
            <Link className="nav-link" to="/appliedjobs">Applied Job</Link>
          </li>:''}

         {user?.email? <li className="nav-item">
            <Link className="nav-link" to="/postjob">Post a job</Link>
          </li>:''}

         {user?.email? <li className="nav-item">
            <Link className="nav-link" to="/myjobs">My Jobs</Link>
          </li>:''}
          {user?.email? <li className="nav-item">
            <Link className="nav-link" ><img title={user?.displayName}src={user.photoURL} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}/></Link>
          </li>:''}
        {user?.email?<li className="nav-item">
            <Link className="nav-link" onClick={handleLogout}>LogOut</Link>
          </li> : <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>}
         {user?.email ? '' :<li className="nav-item">
            <Link className="nav-link " to="/signup">Signup</Link>
          </li>}
        </ul>
      </div>
    </div>
  </nav>
  )
}

import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { GoKey } from 'react-icons/Go'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
export default function Login() {
  let navigate = useNavigate()
const {signInUser,  handleGoogleSignin, passwordReset}=useContext(AuthContext)
let location = useLocation();
let from = location.state?.from?.pathname || "/";
const [emailError, setEmailError] = useState('');
const[isDisabled,setIsDisabled]=useState(true)
const email=useRef(null)
useEffect(()=>{
  loadCaptchaEnginge(6); 
},[])
let handleForgotPass=(e)=>{
  e.preventDefault()

  passwordReset(email.current.value)
  .then(() => {
   alert('Check email')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}
let handleLoginSubmit =(e)=>{
  e.preventDefault()

  const email= e.target.email.value
  const password= e.target.password.value


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
   
    return setEmailError('Please enter a valid email address.');
  }

  

  signInUser(email, password)
  .then((result) => {
   
    const user = result.user;
    const loggedUser={
      email:user.email
    }
    if(user){
      Swal.fire('Login Done')
    }
    
    fetch('https://job-server-eight.vercel.app/jwt',{
    method:'POST',
    headers:{
      'content-type':"application/json"
    },
    body:JSON.stringify(loggedUser)
    })
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('job-access-token',data.token)
 navigate(from, { replace: true });
    })
    


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
 
  });
}

let handleCaptcha =(e)=>{
  const validate_captcha=e.target.value
  if (validateCaptcha(validate_captcha)==true) {
    setIsDisabled(false);
}
else{
  setIsDisabled(true);
}
}
let handleGoogle =()=>{
  setEmailError(null);
  handleGoogleSignin()
  .then((result) => {

    
    const user = result.user;

    const loggedUser={
      email:user.email
    }
    if(user){
      Swal.fire('Login Done')
    }
    
    fetch('https://job-server-eight.vercel.app/jwt',{
    method:'POST',
    headers:{
      'content-type':"application/json"
    },
    body:JSON.stringify(loggedUser)
    })
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('job-access-token',data.token)
 navigate(from, { replace: true });
    })
    

  
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;

    const email = error.customData.email;

    const credential = GoogleAuthProvider.credentialFromError(error);
   
  });
 }
  return (
   <>
    <div className='container '>

            <div className='d-flex justify-content-between  flex-column-reverse flex-md-row gap-5 mt-5'>
              
              <div className='mt-5 text-center'>
                <img
                  src='https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?w=900&t=st=1685046869~exp=1685047469~hmac=97770d86c7866c064804b5b419e841e2d85713293feca2331987026830918be4'
                  className='img-fluid '
                  alt='Job Search Concept'
                />
                <p className='text-start text-secondary'>Explore endless opportunities and find your dream job with our powerful job search platform.</p>
              </div>
              <form   onSubmit={handleLoginSubmit} className='bg-white shadow rounded py-4 px-5 mt-5 '>
                <div>
                  <h1>Welcome to <b className='text-warning'>JobNexus</b> <b className='text-warning'>Login</b></h1>

              
                </div>
                <div className='mt-4'>
                  <button className='btn btn-light w-100 mb-4 shadow-sm d-flex justify-content-center gap-2 align-items-center'onClick={handleGoogle}><img src='https://imagizer.imageshack.com/img922/1517/bT6MYi.png' style={{width:'20px '}}/>Google</button>

                </div>
                <div >
              
      
                <div className='d-flex justify-content-between align-items-center  rounded' style={{backgroundColor:'#ECECEC'}}>
                  <MdEmail className='display-6 px-1' />
                  <input type='email'ref={email} style={{backgroundColor:'#ECECEC'}} placeholder='Email'  name='email' className=' border-0 form-control' required/>
                </div>
                <p className='text-danger'>{emailError}</p>
      
                <div  style={{backgroundColor:'#ECECEC'}} className='mt-4 mb-2 d-flex justify-content-between align-items-center  rounded '   >
                <GoKey className='display-6 px-1'   />
                  <input type='password' style={{backgroundColor:'#ECECEC'}}    placeholder='Password' name='password' className='form-control border-0'  required />
                </div>
      
                <LoadCanvasTemplate />
                <input type='text' onBlur={handleCaptcha}  style={{backgroundColor:'#ECECEC'}}    placeholder='Captcha' name='captcha' className='form-control border-0 mb-3'  required />
            
                <Link onClick={handleForgotPass}>Forgot Password</Link>
                <div>
                  <button  disabled={isDisabled} className=' btn btn-warning border-0 p-2 rounded w-100 mt-4 text-white'>Login</button>
                </div>
                <p className='text-center mt-3 text-secondary'>Don’t have an account? <Link to='/signup'className='text-warning'>Register</Link></p>
                </div>
               
              </form>
              
            </div>
          </div>
   </>
  );
}

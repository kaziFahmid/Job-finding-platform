import React, { useContext, useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { GoKey } from 'react-icons/Go'
import { BiUserCircle } from 'react-icons/Bi'
import { AiFillPicture} from 'react-icons/Ai'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
export default function Signup() {
  let navigate = useNavigate()
  const{createUser,handleGoogleSignin}=useContext(AuthContext)
  const [passConfirmErr,setpassConfirmErr]=useState('');
  const [passErr,setPassErr]=useState('');
  const [emailError, setEmailError] = useState('');
  let location = useLocation();
let from = location.state?.from?.pathname || "/";
let handleSignup =(e)=>{
  e.preventDefault()
  const username=e.target.username.value
  const email= e.target.email.value
  const password= e.target.password.value
  const confirmpassword= e.target.confirmpassword.value
  const picture= e.target.picture.value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
   
    return setEmailError('Please enter a valid email address.');
  }

  if(password.length<6){
    return setPassErr('Password should be at least 6 characters')
  }

  if(password!==confirmpassword){
    return setpassConfirmErr('password doesnot match')
  }
  e.target.reset()
  setEmailError('');
setPassErr('')
setpassConfirmErr('')
  createUser(email, password)
  .then((result) => {
   
    const user = result.user;
 
    
    updateProfile(user, {
      displayName: username, photoURL:picture
    })
    .then(() => {
    
    }).catch((error) => {
  
    });
    navigate(from, { replace: true })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
 
  });
}
 let handleGoogle =()=>{

  handleGoogleSignin()
  .then((result) => {

    
    const user = result.user;

    const signupUser={
      email:user.email
    }
    if(user){
      Swal.fire('New Account Done')
    }
    
    fetch('http://localhost:5000/jwt',{
    method:'POST',
    headers:{
      'content-type':"application/json"
    },
    body:JSON.stringify(signupUser)
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
    <div className='d-flex  flex-column-reverse flex-md-row gap-4  justify-content-between align-items-center'>
 <div>
    <h1 className='display-7'>Join <b className='text-warning'>JobNexus</b> and Discover Your Path to Success</h1>
    <h6>The Best Place to find your Dream Job..!!</h6>
 </div>
 <div className='bg-white shadow   rounded py-4 px-5 my-3 ' >
                <div>
                  <h1>Welcome to <b style={{color:'rgb(65,63,164)'}}>JobNexus</b> <b className='text-warning'>SignUp</b></h1>

              
                </div>
                
                <div className='mt-4'>
                  <button className='btn btn-light w-100 mb-4 shadow-sm d-flex justify-content-center gap-2 align-items-center'  onClick={handleGoogle}><img src='https://imagizer.imageshack.com/img922/1517/bT6MYi.png' style={{width:'20px '}}/>Google</button>

                </div>

              <form onSubmit={handleSignup} >
              <div className='d-flex justify-content-between align-items-center mb-4  rounded' style={{backgroundColor:'#ECECEC'}}>
                 <BiUserCircle className='display-6 px-1' />
                  <input type='text' style={{backgroundColor:'#ECECEC'}} placeholder='Enter Your Username' name='username' className=' border-0 form-control'  required/>
                </div>
                
                <div className='d-flex justify-content-between align-items-center  rounded' style={{backgroundColor:'#ECECEC'}}>
                  <MdEmail className='display-6 px-1' />
                  <input type='email' style={{backgroundColor:'#ECECEC'}} placeholder='Email' name='email' className=' border-0 form-control'  required/>
          
                </div>
                <p className='text-danger'>{emailError}</p>
                <div  style={{backgroundColor:'#ECECEC'}} className='mt-4 mb-2 d-flex justify-content-between align-items-center  rounded '   >
                <GoKey className='display-6 px-1'   />
                  <input type='password' style={{backgroundColor:'#ECECEC'}}    placeholder='Password' name='password' className='form-control border-0' required />
                </div>
                <p className='text-danger'>{passErr}</p>
      
        <div  style={{backgroundColor:'#ECECEC'}} className='mt-4 mb-2 d-flex justify-content-between align-items-center  rounded '   >
                <GoKey className='display-6 px-1'   />
                  <input type='password' style={{backgroundColor:'#ECECEC'}}    placeholder='Confirm Password' name='confirmpassword' className='form-control border-0' required />
                </div>
                <p className='text-danger'>{passConfirmErr}</p>
                <div  style={{backgroundColor:'#ECECEC'}} className='mt-4 mb-2 d-flex justify-content-between align-items-center  rounded '   >
                <AiFillPicture className='display-6 px-1'   />
                  <input type='text' style={{backgroundColor:'#ECECEC'}}    placeholder='Upload Your Picture' name='picture' className='form-control border-0' required />
                </div>
      
                <div>
                  <button  className='btn btn-warning border-0 p-2 rounded w-100 mt-4 text-white'>Signup</button>
                </div>
                <p className='text-center mt-3 text-secondary' >Already have an account? <Link to='/login' className='text-warning'>Signin</Link></p>
              </form>
              </div>
    </div>
  )
}

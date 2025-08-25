import React,{useState} from 'react'
import {FaSignInAlt} from "react-icons/fa"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../firebase/firebase"; // make sure firebase.js is set up




function Login({isLogin,setIsLogin}) {
  const [userData,setUserData]=useState({email:"",password:""});
  const [isLoading, setIsLoading] = useState(false);

    const handleChangeUserData=(e)=>{
      const {name,value}=e.target
      setUserData((prevState)=>({...prevState,[name]:value,}))
    }
    
      const handleAuth = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      alert("Login Successful ✅");
      console.log("Logged in user:", user);

      // reset form
      setUserData({ email: "", password: "" });

      // if you want to switch between login/register forms
      setIsLogin(false);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] background-image">
      <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center'>
      <div className='mb-10'>
      <h1 className='text-center text-[28px] font-bold'>Sign In</h1>
      <p className='text-center text-sm text-gray-400'>Welcome back, login to continue</p>
      </div>
      <div className='w-full'>
        
        <input type="email" name="email" placeholder="Email" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 outline-none'   />
        <input type="password" name="password" placeholder="Password" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 outline-none'   />
      </div>
      <div className='w-full'>
        <button disabled={isLoading} className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center' onClick={handleAuth}>
          {isLoading?(<>Processing...</>):(<>Login <FaSignInAlt/></>)}
        </button>
      </div>
      <div className='mt-5 text-center text-gray-400 text-sm'>
          <button onClick={()=>setIsLogin(!isLogin)}>Don't have an account Yet? Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Login
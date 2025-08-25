import React,{useState} from 'react'
import {FaUserPlus} from "react-icons/fa"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";

function Register({isLogin,setIsLogin}) {
  const [userData,setUserData]=useState({fullName:"",email:"",password:""});
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeUserData=(e)=>{
    const {name,value}=e.target
    setUserData((prevState)=>({...prevState,[name]:value,}))
  }
  
  const handleAuth=async()=>{
    setIsLoading(true);
    try{
       const userCredential= await createUserWithEmailAndPassword(auth,userData?.email,userData?.password);
       const user=userCredential.user;
       const userDocRef=doc(db,"users",user.uid);
       await setDoc(userDocRef,{
        uid:user.uid,
        email:user.email,
        username:user.email?.split('@')[0],
        fullName:userData.fullName,
        image:"",
       })
    }
    catch(error){
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }
   return (
    <div className="flex flex-col justify-center items-center h-[100vh] background-image">
      <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center'>
      <div className='mb-10'>
      <h1 className='text-center text-[28px] font-bold'>Sign Up</h1>
      <p className='text-center text-sm text-gray-400'>Welcome,  create an account to continue</p>
      </div>
      <div className='w-full'>
        <input type="text" name="fullName" onChange={handleChangeUserData} placeholder="UserName" className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 outline-none '   />
        <input type="email" name="email" placeholder="Email" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 outline-none'   />
        <input type="password" name="password" placeholder="Password" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 outline-none'   />
      </div>
      <div className='w-full'>
        
        <button disabled={isLoading} className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center' onClick={handleAuth}>
                  {isLoading?(<>Processing...</>):(<>Register <FaUserPlus/></>)}
                </button>
      </div>
      <div className='mt-5 text-center text-gray-400 text-sm'>
          <button onClick={()=>setIsLogin(!isLogin)}>Already have an account? Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Register
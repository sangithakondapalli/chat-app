/*import React from 'react'
import logo from "../../public/assets/logo.png"
import {RiChatAiLine} from "react-icons/ri"
import {RiFolderUserLine} from "react-icons/ri"
import {RiNotificationLine} from "react-icons/ri"
import {RiBardLine} from "react-icons/ri"
import {RiFile4Line} from "react-icons/ri"
import {RiShutDownLine} from "react-icons/ri"
import {RiArrowDownFill} from "react-icons/ri"
import {signOut} from "firebase/auth"
import {auth} from "../firebase/firebase"
function Navlinks() {
  const handleLogout=async()=>{
    try{
       await signOut(auth);
       alert("Logout Successfull")
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <section className="sticky lg:top-0 items-center flex lg:items-start lg:justify-start 
  h-[12vh] lg:h-[100vh] w-full lg:w-[150px] bg-[#01AA85]">
      <main className='flex lg:flex-col items-center lg:gap-5 justify-between lg:px-0 lg:py-0 w-[100%] py-[9px]' >
        <div className='flex items-start justify-center lg:border-b border-b-1 border-[#ffffffb9] lg:w-[100%] p-[14px]'>
          <span className='flex items-center justify-center'>
             <img src={logo} className='w-[56px] h-[52px] object-contain bg-white rounded-lg p-2' alt=""  />
          </span>
        </div>
        <ul className='flex lg:flex-col flex-row items-center gap-7 md:gap-10 px-2 md:px-0'>
          <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiChatAiLine color="#fff"/>
              </button>
          </li>
           <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiFolderUserLine color="#fff"/>
              </button>
          </li>
           <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiNotificationLine color="#fff"/>
              </button>
          </li>
           <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiFile4Line color="#fff"/>
              </button>
          </li>
           <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiBardLine color="#fff"/>
              </button>
          </li>
           <li className=''>
              <button className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiArrowDownFill color="#fff"/>
              </button>
          </li>
          <li className=''>
              <button onClick={handleLogout} className='lg:text-[28px] text-[22px] cursor-pointer'>
                <RiShutDownLine color="#fff"/>
              </button>
          </li>

        </ul>
        <button className='block lg:hidden lg:text-[28px] text-[22px]'>
                <RiArrowDownFill color="#fff"/>
              </button>

      </main>

    </section>
  )
}

export default Navlinks*/
import React from "react";
import logo from "../../public/assets/logo.png";
import {
  RiChatAiLine,
  RiFolderUserLine,
  RiNotificationLine,
  RiBardLine,
  RiFile4Line,
  RiShutDownLine,
} from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navlinks() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="sticky top-0 flex items-center lg:flex-col 
                 lg:items-stretch lg:justify-between
                 h-[12vh] lg:h-screen w-full lg:w-[150px] 
                 bg-[#01AA85] z-50"
    >
      {/* Logo */}
      <div className="flex justify-center items-center lg:py-4 px-4 lg:border-b border-[#ffffff50]">
        <img
          src={logo}
          alt="Logo"
          className="w-[52px] h-[52px] object-contain bg-white rounded-lg p-2"
        />
      </div>

      {/* Nav Links */}
      <ul
        className="flex flex-row lg:flex-col justify-center items-center
                   flex-1 gap-6 lg:gap-8 px-4 lg:px-0 py-2"
      >
        <li>
          <button className="text-[22px] lg:text-[28px] cursor-pointer hover:scale-105 shadow-lg">
            <RiChatAiLine color="#fff" />
          </button>
        </li>
        <li>
          <button className="text-[22px] lg:text-[28px] cursor-pointer hover:scale-105 shadow-lg">
            <RiFolderUserLine color="#fff" />
          </button>
        </li>
        <li>
          <button className="text-[22px] lg:text-[28px] cursor-pointer hover:scale-105 shadow-lg">
            <RiNotificationLine color="#fff" />
          </button>
        </li>
        <li>
          <button className="text-[22px] lg:text-[28px] cursor-pointer hover:scale-105 shadow-lg">
            <RiFile4Line color="#fff" />
          </button>
        </li>
        <li>
          <button className="text-[22px] lg:text-[28px] cursor-pointer hover:scale-105 shadow-lg">
            <RiBardLine color="#fff" />
          </button>
        </li>
      </ul>

      {/* Logout (always visible, moves bottom on lg) */}
      <div className="flex flex-col justify-center items-center py-2 lg:py-4">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center cursor-pointer group hover:scale-105 shadow-lg"
        >
          <RiShutDownLine className="text-[22px] lg:text-[28px] text-white group-hover:text-green-100" />
          <p className="text-green-300 font-semibold group-hover:text-green-100">
            LogOut
          </p>
        </button>
      </div>
    </nav>
  );
}

export default Navlinks;

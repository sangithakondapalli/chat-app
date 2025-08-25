import React,{useState} from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { query,collection,where} from "firebase/firestore";
import defaultavatar from "../../public/assets/default.jpg";
import {getDocs} from "firebase/firestore";
import { db } from "../firebase/firebase";
function SearchModal({startChat}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users,setUsers]=useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSearch=async()=>{
      if(!searchTerm.trim()){
        alert("Please Enter a Search Term");
        return;
      }
      try{
         const normalizedSearchTerm=searchTerm.toLowerCase();
         const q=query(collection(db,"users"),where("username",">=",normalizedSearchTerm),where("username","<=",normalizedSearchTerm+"\uf8ff"))
          const querySnapshot=await getDocs(q);
          const foundUsers=[];
          querySnapshot.forEach((doc)=>{foundUsers.push(doc.data())});
          setUsers(foundUsers);
          if(foundUsers.length===0){
            alert("No Users Found");
          }
      }
      catch(error){
        console.log(error);
      }
  }
  console.log(users);
  return (
    <div>
      <button
        className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg"
        onClick={openModal}
      >
        <RiSearchLine color="#01AA85" className="w-[18px] h-[18px]" />
      </button>
      {isModalOpen && (<div className="fixed inset-0 z-[100] flex justify-center items-center bg-[#00170cb7] bg-opacity-50 ">
        <div className="relative p-4 w-full max-w-md max-h-full" onClick={(e)=>e.stopPropagation()}>
          <div className="relative bg-[#01AA85] w-[100%] rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-300">
              <h3 className="text-xl font-semibold text-white ">Search Chat</h3>
              <button
                className="text-white bg-transparent hover:bg-[#d9f2ed] hover:text-[#01AA85] rounded-lg text-sm w-8 h-8 justify-center items-center flex"
                onClick={closeModal}
              >
                <FaXmark size={20} />
              </button>
            </div>
            <div className="p-4 md:p-5 ">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input onChange={(e)=>setSearchTerm(e.target.value)}
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full p-2.5"
                  />
                  <button onClick={handleSearch} className="bg-green-900 text-white px-3 py-2 rounded-lg ">
                    <FaSearch />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {users?.map((user)=>(<div onClick={()=>{console.log(user); startChat(user); closeModal()}} className="flex items-start gap-3 bg-[#15eabc34] p-2 rounded-lg cursor-pointer border border-[#ffffff20] shadow-lg mb-3">
                  <img
                    src={user?.image|| defaultavatar}
                    alt=""
                    className="h-[40px] w-[40px] rounded-full "
                  />
                  <span>
                    <h3 className="p-0 font-semibold text-white text-[18px]">
                      {user?.fullName}
                    </h3>
                    <p className="text-white text-[13px]">@{user?.username}</p>
                  </span>
                </div>))}
                
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default SearchModal;

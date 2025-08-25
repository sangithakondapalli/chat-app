import React,{useState,useEffect} from 'react'
import Chatbox from "./components/Chatbox"
import Chatlist from "./components/Chatlist"
import Login from "./components/Login"
import Navlinks from "./components/Navlinks"
import Register from "./components/Register"
import SearchModal from "./components/SearchModal"
import {auth} from "./firebase/firebase.js"
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user,setUser]=useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const currentUser=auth.currentUser;
    if(currentUser){
      setUser(currentUser);
    }
    const unsubscribe=auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
    return ()=>unsubscribe();

  }, []);
  return (
    <div>
      {user? (<div className='flex lg:flex-row flex-col items-start w-[100%] h-100vh'>
        <Navlinks/>
        <Chatlist setSelectedUser={setSelectedUser}/>
        <Chatbox selectedUser={selectedUser}/>

      </div>):(<div>
           {
            isLogin?<Login isLogin={isLogin} setIsLogin={setIsLogin} />:<Register isLogin={isLogin} setIsLogin={setIsLogin}/>
           }
      </div>)}
      
    </div>
  )
}

export default App
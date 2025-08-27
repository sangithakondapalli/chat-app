import React,{useState,useEffect} from 'react'
import Chatbox from "./components/Chatbox"
import Chatlist from "./components/Chatlist"
import Login from "./components/Login"
import Navlinks from "./components/Navlinks"
import Register from "./components/Register"
import SearchModal from "./components/SearchModal"
import {auth} from "./firebase/firebase.js"
import uploadImageToCloudinary from "./lib/cloudinary.js"
import useIsMobile from "./lib/cloudinary.js"
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user,setUser]=useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mobileView, setMobileView] = useState(true); 

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
  /*const handleTestUpload = async (e) => {
  const file = e.target.files[0]; // pick from file input
  const url = await uploadImageToCloudinary(file);
  console.log("Uploaded Image URL:", url);
};*/

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



/*if (!user) {
    return isLogin ? (
      <Login isLogin={isLogin} setIsLogin={setIsLogin} />
    ) : (
      <Register isLogin={isLogin} setIsLogin={setIsLogin} />
    );
  }

  return (
    <div className="flex lg:flex-row flex-col h-screen w-full">
      
      <div className="hidden lg:flex lg:flex-row flex-1">
        <Navlinks />
        <Chatlist setSelectedUser={setSelectedUser} />
        <Chatbox selectedUser={selectedUser} />
      </div>

     
      <div className="flex flex-1 md:hidden relative">
        
        {mobileView === "list" && (
          <Chatlist
            setSelectedUser={(user) => {
              setSelectedUser(user);
              setMobileView("chat"); // switch to chat view on mobile
            }}
          />
        )}

        
        {mobileView === "chat" && (
          <Chatbox
            selectedUser={selectedUser}
            goBack={() => setMobileView("list")} // optional back button
          />
        )}
      </div>
    </div>
  );
}

export default App;
if (!user) {
    return (
      <div>
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
        ) : (
          <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    );
  }*/

  /*return (
    <div className="w-full h-screen">
      
      <div className="hidden md:flex flex-row items-start w-full h-full">
        <Navlinks />
        <Chatlist setSelectedUser={setSelectedUser} />
        <Chatbox selectedUser={selectedUser} />
      </div>

      
      <div className="flex md:hidden w-full h-full">
        {mobileView === "list" && (
          <Chatlist
            setSelectedUser={(u) => {
              setSelectedUser(u);
              setMobileView("chat");
            }}
          />
        )}

        {mobileView === "chat" && (
          <Chatbox
            selectedUser={selectedUser}
            goBack={() => setMobileView("list")}
          />
        )}
      </div>
    </div>
  );
}

export default App;*/
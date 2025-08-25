import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { serverTimestamp } from "firebase/firestore";

import {getFirestore,collection,onSnapshot,doc,getDoc,setDoc,updateDoc,addDoc} from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDKQvrA4bZMmByEF7Kk5Q27cYh92jRlNcs",
  authDomain: "chat-app-b5b8e.firebaseapp.com",
  projectId: "chat-app-b5b8e",
  storageBucket: "chat-app-b5b8e.firebasestorage.app",
  messagingSenderId: "970404542579",
  appId: "1:970404542579:web:3371bf7c390f4a8cfa5206"
};

export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const listenForChats=(setChats)=>{
   const chatsRef=collection(db,"chats");
   const unsubscribe=onSnapshot(chatsRef,(snapshot)=>{
    const chatList=snapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data(),
    }));
    const filteredChats=chatList.filter((chat)=>chat?.users.some((user)=>user.email===auth.currentUser.email))
    setChats(filteredChats)
   })
   return unsubscribe;
}
 export const sendMessage=async(messageText,chatId,user1,user2)=>{
        const chatRef=doc(db,"chats",chatId);
        const user1Doc=await getDoc(doc(db,"users",user1));
        const user2Doc=await getDoc(doc(db,"users",user2));
        
       console.log(user2Doc);
       console.log(user1Doc);
      const user1Data=user1Doc.data();
       const user2Data=user2Doc.data();
      
    const chatDoc=await getDoc(chatRef);
     if(!chatDoc.exists()){
          await setDoc(chatRef,{
             users:[user1Data,user2Data],
             lastMessage:messageText,
             lastMessageTimestamp:serverTimestamp(),

          }) 
     }
     else{
         await updateDoc(chatRef,{
             lastMessage:messageText,
             lastMessageTimestamp:serverTimestamp(),

          }) 
     }
     const messageRef=collection(db,"chats",chatId,"messages");
     await addDoc(messageRef,{
      text:messageText,
      sender:auth.currentUser.email,
      timestamp:serverTimestamp(),
     })

 }
export const listenForMessages=(chatId,setMessages)=>{
           const chatRef=collection(db,"chats",chatId,"messages");
           onSnapshot(chatRef,(snapshot)=>{
              const messages=snapshot.docs.map((doc)=>doc.data());
              setMessages(messages);
           })
 }

 
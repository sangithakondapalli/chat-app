/*import React, { useState, useEffect, useMemo } from "react";
import { RiMore2Fill } from "react-icons/ri";
import SearchModal from "./SearchModal";
import chatData from "../data/chats";
import formatTimestamp from "../utils/formatTimestamp";
import { listenForChats } from "../firebase/firebase";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import defaultAvatar from "../../public/assets/default.jpg";

function Chatlist({ setSelectedUser }) {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  // Get current user in realtime
  useEffect(() => {
    const userDocRef = doc(db, "users", auth?.currentUser?.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setUser(doc.data());
    });
    return unsubscribe;
  }, []);

  // Listen for chats
  useEffect(() => {
    const unsubscribe = listenForChats(setChats);
    return () => {
      unsubscribe();
    };
  }, []);

  // Sort chats by last message timestamp
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const aTimestamp =
        a.lastMessageTimestamp?.seconds +
        a.lastMessageTimestamp?.nanoseconds / 1e9;
      const bTimestamp =
        b.lastMessageTimestamp?.seconds +
        b.lastMessageTimestamp?.nanoseconds / 1e9;

      return bTimestamp - aTimestamp;
    });
  }, [chats]);

  const startChat = (user) => {
    setSelectedUser(user);
  };

  return (
    <section className="relative h-[100vh] hidden lg:flex flex-col items-start justify-start bg-white w-full md:w-[600px]">
      
      <header className="flex items-center justify-between w-full border-b border-[#898989b9] p-4 sticky md:static top-0 z-[100]">
        <main className="flex items-center gap-3">
          <img
            src="/assets/default.jpg"
            alt="default"
            className="w-[44px] h-[44px] object-cover rounded-full"
          />
          <span>
            <h3 className="font-semibold text-[#2A3D39] md:text-[17px]">
              {user?.fullName || "Chatfrik User"}
            </h3>
            <p className="font-light text-[#2A3D39] text-[15px]">
              {user?.email || "Chatfrik"}
            </p>
          </span>
        </main>
        <button className="bg-[#09F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg">
          <RiMore2Fill color="#01AA85" className="w-[28px] h-[28px]" />
        </button>
      </header>

      
      <div className="w-full px-5 mt-[10px]">
        <header className="flex items-center justify-between ">
          <h3 className="text-[16px]">Messages ({chats.length || 0})</h3>
          <SearchModal startChat={startChat} />
        </header>
      </div>

      
      <main className="flex-1 flex flex-col overflow-y-auto items-start px-5 w-full custom-scrollbar">
        
        {sortedChats?.map((chat) =>
          chat?.users
            ?.filter((u) => u?.email !== auth?.currentUser?.email)
            ?.map((chatUser) => (
              <div
                key={chatUser?.uid}
                onClick={() => startChat(chatUser)}
                className="flex items-start justify-between w-full border-b border-[#9090902c] px-5 pb-3 pt-3 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={chatUser?.image || defaultAvatar}
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                  <span>
                    <h2 className="font-semibold text-[#2A3d39] text-left text-[17px]">
                      {chatUser?.fullName || "ChatFrik User"}
                    </h2>
                    <p className="font-light text-[#2A3d39] text-left text-[14px] truncate max-w-[200px]">
                      {chat?.lastMessage}
                    </p>
                  </span>
                </div>
                <p className="text-gray-400 text-[11px]">
                  {formatTimestamp(chat?.lastMessageTimestamp, true)}
                </p>
              </div>
            ))
        )}
       
      </main>
    </section>
  );
}

export default Chatlist;*/

import React, { useState, useEffect, useMemo } from "react";
import { RiMore2Fill } from "react-icons/ri";
import SearchModal from "./SearchModal";
import chatData from "../data/chats";
import formatTimestamp from "../utils/formatTimestamp";
import { listenForChats } from "../firebase/firebase";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import defaultAvatar from "../../public/assets/default.jpg";
import useIsMobile from "../utils/Ismobile.js"
function Chatlist({ setSelectedUser}) {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  // Get current user in realtime
  useEffect(() => {
    const userDocRef = doc(db, "users", auth?.currentUser?.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setUser(doc.data());
    });
    return unsubscribe;
  }, []);

  // Listen for chats
  useEffect(() => {
    const unsubscribe = listenForChats(setChats);
    return () => {
      unsubscribe();
    };
  }, []);

  // Sort chats by last message timestamp
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const aTimestamp =
        a?.lastMessageTimestamp?.seconds +
        a?.lastMessageTimestamp?.nanoseconds / 1e9;
      const bTimestamp =
        b?.lastMessageTimestamp?.seconds +
        b?.lastMessageTimestamp?.nanoseconds / 1e9;

      return bTimestamp - aTimestamp;
    });
  }, [chats]);

  const startChat = (user) => {
    setSelectedUser(user);
    
  };

  return (
    <section className="relative h-[100vh] hidden lg:flex flex-col items-start justify-start bg-white w-full md:w-[600px]">
      {/* Header */}
      <header className="flex items-center justify-between w-full border-b border-r border-[#898989b9] p-4 sticky md:static top-0 z-[100]">
        <main className="flex items-center gap-3">
          <img
            src="/assets/default.jpg"
            alt="default"
            className="w-[44px] h-[44px] object-cover rounded-full"
          />
          <span>
            <h3 className="font-semibold text-[#2A3D39] md:text-[17px] truncate max-w-[160px]">
              {user?.fullName || "Chatfrik User"}
            </h3>
            <p className="font-light text-[#2A3D39] text-[15px]">
              {user?.email || "Chatfrik"}
            </p>
          </span>
        </main>
        <button className="bg-[#09F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg">
          <RiMore2Fill color="#01AA85" className="w-[28px] h-[28px]" />
        </button>
      </header>

      {/* Messages Section */}
      <div className="w-full px-5 mt-[10px]">
        <header className="flex items-center justify-between ">
          <h3 className="text-[16px]">Messages ({chats.length || 0})</h3>
          <SearchModal startChat={startChat} />
        </header>
      </div>

      {/* Chat List */}
      <main className="flex-1 flex flex-col overflow-y-auto items-start px-5 w-full custom-scrollbar">
        {sortedChats?.map((chat) =>
          chat?.users
            ?.filter((u) => u?.email !== auth?.currentUser?.email)
            ?.map((chatUser) => (
              <div
                key={chatUser?.uid}
                onClick={() => startChat(chatUser)}
                className="flex items-center justify-between w-full border-b border-[#9090902c] px-5 pb-3 pt-3 cursor-pointer hover:bg-gray-50"
              >
                {/* Left side: avatar + name + last message */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <img
                    src={chatUser?.image || defaultAvatar}
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <h2 className="font-semibold text-[#2A3d39] text-[17px] truncate max-w-[200px]">
                      {chatUser?.fullName || "ChatFrik User"}
                    </h2>
                    <p className="font-light text-[#2A3d39] text-[14px] truncate max-w-[200px]">
                      {chat?.lastMessage?.text
                        ? chat.lastMessage.text // show text if available
                        : chat?.lastMessage?.imageUrl
                        ? "📷 Photo" // fallback text when image exists
                        : "No messages yet"}
                    </p>
                  </span>
                </div>

                {/* Right side: timestamp (fixed, no shrink) */}
                <p className="text-gray-400 text-[11px] flex-shrink-0 ml-2">
                  {formatTimestamp(chat?.lastMessageTimestamp, true)}
                </p>
              </div>
            ))
        )}
      </main>
    </section>
  );
}

export default Chatlist;

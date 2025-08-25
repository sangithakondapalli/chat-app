/*import React, { useState, useEffect, useMemo, useRef } from "react";
import formatTimestamp from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultavatar from "../../public/assets/default.jpg";
import messageData from "../data/messageData";
import { auth, sendMessage,listenForMessages} from "../firebase/firebase";
import logo from "../../public/assets/logo.png"
function Chatbox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const senderEmail = auth?.currentUser?.email;
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef(null);

  // Create unique chatId based on UID comparison
  const chatId =
    auth?.currentUser?.uid < selectedUser?.uid
      ? `${auth?.currentUser?.uid}.${selectedUser?.uid}`
      : `${selectedUser?.uid}.${auth?.currentUser?.uid}`;

  const user1 = auth?.currentUser;
  const user2 = selectedUser;

  // Load initial messages (dummy data for now)
  useEffect(() => {
    listenForMessages(chatId,setMessages);
  }, [chatId]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  // Sort messages oldest → newest
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      sender: senderEmail,
      text: messageText,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };

    // Send to Firebase
    sendMessage(messageText, chatId, user1?.uid, user2?.uid);

    // Update local state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  return (
    <>
      {selectedUser ? (
        <section className="flex flex-col items-start justify-start h-screen w-[100%] background-image">
          
          <header className="border-b border-gray-400 w-full h-[82px] px-4 bg-white">
            <main className="flex items-center gap-3">
              <span>
                <img
                  src={selectedUser?.image || defaultavatar}
                  alt=""
                  className="h-11 w-11 object-cover rounded-full"
                />
              </span>
              <span>
                <h3 className="font-semibold text-[#2A3D39] text-lg">
                  {selectedUser?.fullName || "Chatfrik User"}
                </h3>
                <p className="font-light text-[#2A3D39] text-sm">
                  @{selectedUser?.username || "chatfrik"}
                </p>
              </span>
            </main>
          </header>

          
          <main className="relative h-[calc(100vh-82px)] w-full flex flex-col justify-between">
            <section className="px-3 pt-5 pb-20 lg:pb-10">
              <div ref={scrollRef} className=" overflow-auto custom-scrollbar">
                {sortedMessages?.map((msg, index) => (
                  <div key={index}>
                    {msg.sender === senderEmail ? (
                      // Sender's message (align right)
                      <div className="flex flex-col items-end w-full">
                        <span className="flex gap-3 me-10 h-auto">
                          <div>
                            <div className="flex items-center bg-white justify-center p-6 rounded-lg shadow-sm">
                              <h4>{msg.text}</h4>
                            </div>
                            <p className="text-gray-300 text-xs mt-3 text-right">
                              {formatTimestamp(msg.timestamp)}
                            </p>
                          </div>
                        </span>
                      </div>
                    ) : (
                      // Receiver's message (align left)
                      <div className="flex flex-col items-start w-full">
                        <span className="flex gap-3 w-[40%] h-auto ms-10">
                          <img
                            src={defaultavatar}
                            alt=""
                            className="h-11 w-11 object-cover rounded-full"
                          />
                          <div>
                            <div className="flex items-center bg-white justify-center p-6 rounded-lg shadow-sm">
                              <h4>{msg.text}</h4>
                            </div>
                            <p className="text-gray-300 text-xs mt-3">
                              {formatTimestamp(msg.timestamp)}
                            </p>
                          </div>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="sticky lg:bottom-0 bottom-[60px] w-full p-3 h-fit">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center bg-white h-[45px] w-full px-2 rounded-lg relative shadow-lg"
              >
                <input
                  onChange={(e) => setMessageText(e.target.value)}
                  type="text"
                  value={messageText}
                  placeholder="Write your message..."
                  className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-full"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
                >
                  <RiSendPlaneFill color="#01AA85" />
                </button>
              </form>
            </div>
          </main>
        </section>
      ) :(<section className="flex flex-col items-start justify-start h-screen w-[100%] background-image">
        <div className="flex flex-col justify-center items-center h-[100vh] w-[100%]">
          
          <img src={logo} alt="chatfrik logo"/>
          <h1 className="text-[30px] font-bold text-teal-700 mt-5 ">Welcome to Chatfrik</h1>
          <p className="text-gray-500">Connect an Chat with friends,securely,fast and free</p>
        </div>
        </section>)}
    </>
  );
} 

export default Chatbox;*/

import React, { useState, useEffect, useMemo, useRef } from "react";
import formatTimestamp from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultavatar from "../../public/assets/default.jpg";
import { auth, sendMessage, listenForMessages } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";

function Chatbox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const senderEmail = auth?.currentUser?.email;
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef(null);

  // Create unique chatId based on UID comparison
  const chatId =
    auth?.currentUser?.uid < selectedUser?.uid
      ? `${auth?.currentUser?.uid}.${selectedUser?.uid}`
      : `${selectedUser?.uid}.${auth?.currentUser?.uid}`;

  const user1 = auth?.currentUser;
  const user2 = selectedUser;

  // Load messages
  useEffect(() => {
    if (chatId) listenForMessages(chatId, setMessages);
  }, [chatId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Sort messages
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      sender: senderEmail,
      text: messageText,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };

    sendMessage(messageText, chatId, user1?.uid, user2?.uid);
    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
  };

  return (
    <>
      {selectedUser ? (
        <section className="flex flex-col h-screen w-full background-image">
          {/* Header */}
          <header className="h-[82px] flex items-center gap-3 border-b border-gray-400 px-4 bg-white">
            <img
              src={selectedUser?.image || defaultavatar}
              alt=""
              className="h-11 w-11 object-cover rounded-full"
            />
            <div>
              <h3 className="font-semibold text-[#2A3D39] text-lg">
                {selectedUser?.fullName || "Chatfrik User"}
              </h3>
              <p className="font-light text-[#2A3D39] text-sm">
                @{selectedUser?.username || "chatfrik"}
              </p>
            </div>
          </header>

          {/* Messages (scrollable only here) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar"
          >
            {sortedMessages?.map((msg, index) => (
              <div key={index}>
                {msg.sender === senderEmail ? (
                  <div className="flex justify-end mb-4">
                    <div>
                      <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md">
                        <h4>{msg.text}</h4>
                      </div>
                      <p className="text-gray-300 text-xs mt-1 text-right">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={defaultavatar}
                      alt=""
                      className="h-11 w-11 object-cover rounded-full"
                    />
                    <div>
                      <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md">
                        <h4>{msg.text}</h4>
                      </div>
                      <p className="text-gray-300 text-xs mt-1">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 shadow-md rounded-lg">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center bg-gray-50 h-[30px] w-full px-2 rounded-lg relative"
            >
              <input
                onChange={(e) => setMessageText(e.target.value)}
                type="text"
                value={messageText}
                placeholder="Write your message..."
                className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-full"
              />
              <button
                type="submit"
                className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
              >
                <RiSendPlaneFill color="#01AA85" />
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center h-screen w-full background-image">
          <img src={logo} alt="chatfrik logo" />
          <h1 className="text-[30px] font-bold text-teal-700 mt-5">
            Welcome to Chatfrik
          </h1>
          <p className="text-gray-500">
            Connect and Chat with friends, securely, fast and free
          </p>
        </section>
      )}
    </>
  );
}

export default Chatbox;



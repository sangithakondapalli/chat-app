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

/*import React, { useState, useEffect, useMemo, useRef } from "react";
import formatTimestamp from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultavatar from "../../public/assets/default.jpg";
import { auth, sendMessage, listenForMessages } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import EmojiPicker from "emoji-picker-react";

function Chatbox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const senderEmail = auth?.currentUser?.email;
  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);

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
      const aTimestamp =
        a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp =
        b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);
  const handleEmojiClick = (emojiObject) => {
    setMessageText((prev) => prev + emojiObject.emoji);
  };

  // Send message
  // Inside handleSendMessage
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedImage) return;

    try {
      let imageUrl = null;

      // If an image is selected → upload first
      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }

      await sendMessage(
        messageText,
        chatId,
        user1.uid,
        user2.uid,
        imageUrl // pass URL, not File
      );

      setMessageText("");
      setSelectedImage(null);
      console.log("Message sent successfully!");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <>
      {selectedUser ? (
        <section className="flex flex-col h-screen w-full background-image">
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
                        {msg.text && <h4>{msg.text}</h4>}
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="received"
                            className="mt-2 rounded-lg max-h-60 object-cover"
                          />
                        )}
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
                        {msg.text && <h4>{msg.text}</h4>}
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="received"
                            className="mt-2 rounded-lg max-h-60 object-cover"
                          />
                        )}
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
          {showEmojiPicker ? <div className="absolute bottom-12 right-0 z-50">
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>: <div className="p-3 bg-white border-t border-gray-100 shadow-md rounded-lg">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center bg-gray-50 h-[30px] w-full px-2 rounded-lg relative"
            >
              {selectedImage && (
                <div className="mb-2 relative w-fit">
                  <div className="relative w-15 h-15">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="preview"
                      className="h-15 w-15 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-sm size-1.5"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              )}
              <input
                type="file"
                id="imageUpload"
                //accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-12 text-2xl"
              >
                😊
              </button>
              <input
                onChange={(e) => setMessageText(e.target.value)}
                type="text"
                value={messageText}
                placeholder="Write your message..."
                className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-full"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer mr-12 text-black text-3xl bg-transparent"
              >
                📷
              </label>
              <button
                type="submit"
                className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
              >
                <RiSendPlaneFill color="#01AA85" />
              </button>
            </form>
          </div>}
          
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

export default Chatbox;*/
/*import React, { useState, useEffect, useMemo, useRef } from "react";
import formatTimestamp from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultavatar from "../../public/assets/default.jpg";
import { auth, sendMessage, listenForMessages } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import EmojiPicker from "emoji-picker-react";
import { IoCameraOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
function Chatbox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);

  const senderEmail = auth?.currentUser?.email;

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

  // Sort messages oldest → newest
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);

  const handleEmojiClick = (emojiObject) => {
    setMessageText((prev) => prev + emojiObject.emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedImage) return;

    try {
      let imageUrl = null;

      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }

      await sendMessage(messageText, chatId, user1.uid, user2.uid, imageUrl);

      setMessageText("");
      setSelectedImage(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!selectedUser) {
    return (
      <section className="flex flex-col items-center justify-center h-screen w-full background-image">
        <img src={logo} alt="chatfrik logo" />
        <h1 className="text-[30px] font-bold text-teal-700 mt-5">
          Welcome to Chatfrik
        </h1>
        <p className="text-gray-500">
          Connect and Chat with friends, securely, fast and free
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-screen w-full background-image">
      
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

      
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar"
      >
        {sortedMessages.map((msg, index) => (
          <div key={index}>
            {msg.sender === senderEmail ? (
              <div className="flex justify-end mb-4">
                <div>
                  <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md break-words">
                    {msg.text && <h4>{msg.text}</h4>}
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="received"
                        className="mt-2 rounded-lg max-h-60 object-cover"
                      />
                    )}
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
                  <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md break-words">
                    {msg.text && <h4>{msg.text}</h4>}
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="received"
                        className="mt-2 rounded-lg max-h-60 object-cover"
                      />
                    )}
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

      
      <div className="p-2 bg-white border-t border-gray-100 shadow-md rounded-lg relative">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center bg-gray-50 h-[40px] w-full px-2 rounded-lg relative"
        >
          {selectedImage && (
            <div className="mb-2 relative w-fit">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="h-12 w-12 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"
              >
                <RxCross2 className="text-sm"/>
              </button>
            </div>
          )}

          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write your message..."
            className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-34 rounded-lg w-full"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-2xl cursor-pointer flex items-center justify-center absolute right-23 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
           <GrEmoji color="#01AA85" className="text-xl " />
          </button>

          <label
            htmlFor="imageUpload"
            className="cursor-pointer mr-10 flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
            <IoCameraOutline  color="#01AA85" className="text-xl"/>
          </label>

          <button
            type="submit"
            className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
            <RiSendPlaneFill color="#01AA85" />
          </button>
        </form>

        {showEmojiPicker && (
          <div className="absolute bottom-[48px] right-3 z-50 transform scale-75">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" className="size-0.5" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Chatbox;*/
import React, { useState, useEffect, useMemo, useRef } from "react";
import formatTimestamp from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import defaultavatar from "../../public/assets/default.jpg";
import { auth, sendMessage, listenForMessages, db } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";
import uploadImageToCloudinary from "../lib/cloudinary";
import EmojiPicker from "emoji-picker-react";
import { IoCameraOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { RiArrowLeftLine } from "react-icons/ri";
import useIsMobile from "../utils/Ismobile.js"
function Chatbox({ selectedUser}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  const scrollRef = useRef(null);
  const senderEmail = auth?.currentUser?.email;

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

  // Smooth scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Listen for typing status
  useEffect(() => {
    if (!chatId) return;

    const typingRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(typingRef, (docSnap) => {
      const data = docSnap.data();
      if (data) {
        setIsOtherTyping(data[selectedUser.uid + "_typing"] || false);
      }
    });
    return () => unsubscribe();
  }, [chatId, selectedUser]);
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);

  const handleEmojiClick = (emojiObject) => {
    setMessageText((prev) => prev + emojiObject.emoji);
  };

  // Update typing status in Firebase
  const handleInputChange = async (e) => {
    setMessageText(e.target.value);

    const typingRef = doc(db, "chats", chatId);
    await updateDoc(typingRef, {
      [auth.currentUser.uid + "_typing"]: e.target.value.length > 0,
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedImage) return;

    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }

      await sendMessage(messageText, chatId, user1.uid, user2.uid, imageUrl);

      setMessageText("");
      setSelectedImage(null);
      setShowEmojiPicker(false);

      // Clear typing status
      const typingRef = doc(db, "chats", chatId);
      await updateDoc(typingRef, { [auth.currentUser.uid + "_typing"]: false });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!selectedUser) {
    return (
      <section className="flex flex-col items-center justify-center h-screen w-full background-image">
        <img src={logo} alt="chatfrik logo" />
        <h1 className="text-[30px] font-bold text-teal-700 mt-5">
          Welcome to Chatfrik
        </h1>
        <p className="text-gray-500">
          Connect and Chat with friends, securely, fast and free
        </p>
      </section>
    );
  }

  return (
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

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar"
      >
        {sortedMessages.map((msg, index) => (
          <div key={index}>
            {msg.sender === senderEmail ? (
              <div className="flex justify-end mb-4">
                <div>
                  <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md break-words">
                    {msg.text && <h4>{msg.text}</h4>}
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="received"
                        className="mt-2 rounded-lg max-h-60 object-cover"
                      />
                    )}
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
                  <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs lg:max-w-md break-words">
                    {msg.text && <h4>{msg.text}</h4>}
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="received"
                        className="mt-2 rounded-lg max-h-60 object-cover"
                      />
                    )}
                  </div>
                  <p className="text-gray-300 text-xs mt-1">
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isOtherTyping && (
          <p className="text-gray-400 text-sm mb-2 ml-14">Typing...</p>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 bg-white border-t border-gray-100 shadow-md rounded-lg relative">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center bg-gray-50 h-[45px] w-full px-2 rounded-lg relative"
        >
          {selectedImage && (
            <div className="mb-2 relative w-fit">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="h-32 w-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                ✖
              </button>
            </div>
          )}

          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />

          <input
            type="text"
            value={messageText}
            onChange={handleInputChange} // <-- updated to include typing
            placeholder="Write your message..."
            className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-full"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-2xl cursor-pointer flex items-center justify-center absolute right-23 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
            <GrEmoji color="#01AA85" className="text-xl " />
          </button>

          <label
            htmlFor="imageUpload"
            className="cursor-pointer mr-10 flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
            <IoCameraOutline color="#01AA85" className="text-xl" />
          </label>

          <button
            type="submit"
            className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
          >
            <RiSendPlaneFill color="#01AA85" />
          </button>
        </form>

        {showEmojiPicker && (
          <div className="absolute bottom-[25px] right-3 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Chatbox;



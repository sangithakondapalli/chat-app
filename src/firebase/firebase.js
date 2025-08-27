import { initializeApp } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
import uploadImageToCloudinary from "../lib/cloudinary";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKQvrA4bZMmByEF7Kk5Q27cYh92jRlNcs",
  authDomain: "chat-app-b5b8e.firebaseapp.com",
  projectId: "chat-app-b5b8e",
  storageBucket: "chat-app-b5b8e.firebasestorage.app",
  messagingSenderId: "970404542579",
  appId: "1:970404542579:web:3371bf7c390f4a8cfa5206",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// 🔹 Listen for user chats
export const listenForChats = (setChats) => {
  const chatsRef = collection(db, "chats");
  const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
    const chatList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredChats = chatList.filter((chat) =>
      chat?.users.some((user) => user.email === auth.currentUser.email)
    );
    setChats(filteredChats);
  });
  return unsubscribe;
};

// 🔹 Send Message (with optional image)
export const sendMessage = async (
  messageText,
  chatId,
  user1,
  user2,
  imageUrl = null
) => {
  const chatRef = doc(db, "chats", chatId);
  const user1Doc = await getDoc(doc(db, "users", user1));
  const user2Doc = await getDoc(doc(db, "users", user2));

  const user1Data = user1Doc.data();
  const user2Data = user2Doc.data();

  const chatDoc = await getDoc(chatRef);

  /*if (!chatDoc.exists()) {
    await setDoc(chatRef, {
      users: [user1Data, user2Data],
      lastMessage: messageText || "📷 Image",
      lastMessageTimestamp: serverTimestamp(),
    });
  } else {
    await updateDoc(chatRef, {
      lastMessage: messageText || "📷 Image",
      lastMessageTimestamp: serverTimestamp(),
    });
  }*/
if (!chatDoc.exists()) {
  await setDoc(chatRef, {
    users: [user1Data, user2Data],
    lastMessage: {
      text: messageText || "",
      imageUrl: imageUrl,
    },
    lastMessageTimestamp: serverTimestamp(),
  });
} else {
  await updateDoc(chatRef, {
    lastMessage: {
      text: messageText || "",
      imageUrl: imageUrl,
    },
    lastMessageTimestamp: serverTimestamp(),
  });
}


  // 🔹 Upload image if provided
  //let imageUrl = null;
  //if (imageFile) {
   // try {
   //   imageUrl = await uploadImageToCloudinary(imageFile);
    //  console.log("Uploaded image URL:", imageUrl);
    //} catch (err) {
    //  console.error("Cloudinary upload error:", err);
    //}
  //}

  // 🔹 Save message
  const messageRef = collection(db, "chats", chatId, "messages");
  const newMessage = {
    text: messageText || "",
    imageUrl: imageUrl ,
    sender: auth.currentUser.email,
    timestamp: serverTimestamp(),
  };

  await addDoc(messageRef, newMessage);
  console.log("Message saved in Firestore:", newMessage);
};

// 🔹 Listen for messages
export const listenForMessages = (chatId, setMessages) => {
  const chatRef = collection(db, "chats", chatId, "messages");
  onSnapshot(chatRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Messages received from Firestore:", messages);
    setMessages(messages);
  });
};

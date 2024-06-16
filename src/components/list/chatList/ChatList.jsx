import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import useUserStore from "../../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

const ChatList = () => {
  const [addContactMode, setAddContactMode] = useState(false);
  const [chats, setChats] = useState([]);
  // console.log(chats);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
      setChats(doc.data()?.chats);
    });

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  return (
    <div className="chatList">
      {/* search chat */}
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="search" placeholder="Search" />
        </div>

        <img
          onClick={() => setAddContactMode((prev) => !prev)}
          className="add"
          src={`/${addContactMode ? "minus" : "plus"}.png`}
          alt=""
        />
      </div>

      {/* chat list */}
      <section className="chatItems">
        {/* {chats &&
          chats.map((chat) => (
            <div key={chat.chatId} className="chatItem">
              <img src="/avatar.png" alt="" />
              <div className="texts">
                <span>Jane Doe</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))} */}

        <div className="chatItem">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>last message...</p>
          </div>
        </div>

        <div className="chatItem">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>last message...</p>
          </div>
        </div>

        <div className="chatItem">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>last message...</p>
          </div>
        </div>

        <div className="chatItem">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>last message...</p>
          </div>
        </div>
      </section>

      {/* add new user */}
      {addContactMode && <AddUser />}
    </div>
  );
};

export default ChatList;

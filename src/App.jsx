import React, { useEffect, useState } from "react";

import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebaseConfig";
import useUserStore from "./lib/userStore";

const App = () => {
  const { currentUser, loading, fetchUserInfo } = useUserStore();

  console.log(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchUserInfo]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="app-container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}

      {/* toast notifications */}
      <Notification />
    </div>
  );
};

export default App;

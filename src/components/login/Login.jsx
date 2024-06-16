import React, { useState } from "react";
import "./login.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebaseConfig";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import firebaseUpload from "../../lib/firebaseUpload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState({ login: false, signup: false });

  const handleLogin = async (e) => {
    e.preventDefault();

    // pull out entered details by user
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    setLoading((prevState) => ({ ...prevState, login: true }));

    try {
      // handling sign in
      const payload = await signInWithEmailAndPassword(auth, email, password);
      const user = payload.user;
      if (user) {
        toast.success("User logged in successfully!");
      }
    } catch (error) {
      console.error("Error logging in: ", error.message);
    } finally {
      setLoading((prevState) => ({ ...prevState, login: false }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // after a successful sign up, add the user into the users collection. Also add the userChats collection

    const formData = new FormData(e.target); //returns a list of key,value pairs >> i.e, [["key", "value"], ["key", "value"]]
    // therefore, the data structure stored into the formData must be transformed into an object using Object.fromEntries(formData)
    const { username, email, password } = Object.fromEntries(formData);

    setLoading((prevState) => ({ ...prevState, signup: true }));

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      /*
      1. create a users collection {id, username, email, avatar, blocked:[]}
      */
      const avatarURL = await firebaseUpload(avatar?.file);

      await setDoc(doc(db, "users", userCredentials.user.uid), {
        id: userCredentials.user.uid,
        username,
        email,
        avatar: avatarURL,
        blocked: [],
      });

      await setDoc(doc(db, "userChats", userCredentials.user.uid), {
        id: userCredentials.user.uid,
        chats: [],
      });

      toast.success("User created successfully. You can login now.");
    } catch (error) {
      console.log("There was an error creating this user", error.message);
      toast.error(error.message);
    } finally {
      setLoading((prevState) => ({ ...prevState, signup: false }));
    }
  };

  const handleAvatarSelection = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setAvatar({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back, </h2>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />

          <button disabled={loading.login}>
            {loading.login ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <div className="seperator"></div>

      {/* user sign up */}
      <div className="item">
        <h2>Create an Account</h2>

        <form onSubmit={handleSignup}>
          <label htmlFor="file">
            <img src={avatar?.url || "/avatar.png"} alt="avatar" />
            Upload an image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleAvatarSelection}
          />
          <input type="text" placeholder="Username" name="username" required />
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          <button disabled={loading.signup}>
            {loading.signup ? "Creating user" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

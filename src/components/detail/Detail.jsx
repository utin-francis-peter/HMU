import React from "react";
import "./detail.css";
import { auth } from "../../lib/firebaseConfig";

const Detail = () => {
  return (
    <div className="detail">
      <header>
        {/* receiver profile info */}
        <img src="/avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </header>

      <main>
        {/* files and other options */}
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="/arrowUp.png" alt="" />
          </div>
          {/* body that holds all shared photos between contacts */}
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="francis.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              {/* download icon */}
              <img src="/download.png" alt="" className="icon" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="francis.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              {/* download icon */}
              <img src="/download.png" alt="" className="icon" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="francis.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              {/* download icon */}
              <img src="/download.png" alt="" className="icon" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="francis.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              {/* download icon */}
              <img src="/download.png" alt="" className="icon" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="francis.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              {/* download icon */}
              <img src="/download.png" alt="" className="icon" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
      </main>

      <footer>
        {/* actions => e.g BLOCK USER */}
        <button className="blockUser">Block User</button>
        <button onClick={() => auth.signOut()} className="logout">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Detail;

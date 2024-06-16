import React, { useEffect, useRef, useState } from "react";
import "./chat.css";

import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const endRef = useRef(null);

  // using useEffect to trigger the scrollTo function on initial component mount
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmojiSelection = (e) => {
    const { emoji } = e;
    setMessage(message + emoji);
    setOpen(false);
  };

  // console.log(message);
  return (
    <div className="chat">
      <header>
        <div className="user-info">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor.</p>
          </div>
        </div>

        <div className="icons">
          <img src="/phone.png" alt="" />
          <img src="/video.png" alt="" />
          <img src="/info.png" alt="" />
        </div>
      </header>

      <main>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message ownerMssg">
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message ownerMssg">
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message ownerMssg">
          <div className="texts">
            {/* img mssg*/}
            <img src="/francis.jpeg" alt="" />
            <p>
              Last Message dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              veritatis dolores ducimus incidunt. Autem, recusandae quaerat.
              Saepe accusamus minima voluptates!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
        {/* scrolls above div into view on component mount */}
      </main>

      {/* chats input area */}
      <footer>
        <div className="icons">
          <img src="/img.png" alt="" />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          name=""
          id=""
        />

        <div className="actions">
          <div className="pickEmoji">
            <img
              onClick={() => setOpen((prev) => !prev)}
              src="/emoji.png "
              alt=""
            />
            <div className="emojiCollection">
              <EmojiPicker open={open} onEmojiClick={handleEmojiSelection} />
            </div>
          </div>

          <button className="sendBtn">Send </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;

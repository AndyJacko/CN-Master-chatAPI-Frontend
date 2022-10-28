import React, { useContext, useRef, useState } from "react";

import AuthContext from "../../store/authContext";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";

const AddChatForm = ({ chatAdded, cc }) => {
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState();

  const chatInputRef = useRef();
  const tagsInputRef = useRef();

  const onChatSubmit = async (e) => {
    e.preventDefault();
    const chat = chatInputRef.current.value;
    const tags = tagsInputRef.current.value;

    if (!chat || !tags || chat.trim() === "" || tags.trim() === "") {
      setMessage(<p className="text-danger">Invalid chat details...</p>);
      return;
    }

    const response = await fetch(
      "https://api.doubleornothingyoyos.com/createChat/",
      {
        method: "POST",
        body: JSON.stringify({ userID: authCtx.user, chat: chat, tags: tags }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (responseData.message === "Chat Created") {
      setMessage(<p className="text-success">Chat message added...</p>);
    } else {
      setMessage(<p className="text-danger">Unable to add chat...</p>);
    }

    chatInputRef.current.value = "";
    tagsInputRef.current.value = "";

    setTimeout(() => {
      setMessage("");
      chatAdded();
    }, 3000);
  };

  const closeChat = () => {
    cc();
  };

  return (
    <div className="border border-light border-opacity-25 my-3 p-2 rounded shadow">
      <form onSubmit={onChatSubmit}>
        <div className="d-flex py-2 align-items-center justify-content-between fs-2">
          <div>Add Chat Message</div>
          <div className="text-danger" onClick={closeChat} role="button">
            <i className="fa-solid fa-square-xmark"></i>
          </div>
        </div>

        {message && message}

        <TextArea id="chat" ph="Your chat message" rf={chatInputRef} />
        <Input
          id="tags"
          ty="text"
          ph="Tags (separated by comma)"
          rf={tagsInputRef}
        />
        <Button colour="btn-success" label="Add Chat" />
      </form>
    </div>
  );
};

export default AddChatForm;

import React, { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../../store/authContext";
import Spinner from "../UI/Spinner/Spinner";
import ChatInput from "../UI/ChatInput/ChatInput";

const ChatItem = ({ chat, chatAdded }) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();
  const [disabled, setDisabled] = useState(true);

  const ipt = useRef();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `https://api.doubleornothingyoyos.com/readUser/${chat.userID}/`
      );
      const responseData = await response.json();

      setUser(responseData.user[0].username);
    };

    getUser();
  }, [chat.userID]);

  useEffect(() => {
    if (!disabled) {
      ipt.current.setSelectionRange(
        ipt.current.value.length,
        ipt.current.value.length
      );
      ipt.current.focus();
    }
  }, [disabled]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getHours()}:${
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes()
    }`;
  };

  const deleteChat = async () => {
    if (window.confirm("Delete Chat Message?")) {
      const response = await fetch(
        `https://api.doubleornothingyoyos.com/deleteChat/${chat._id}/`,
        { method: "DELETE" }
      );
      const responseData = await response.json();

      if (responseData.message === "Chat Deleted") {
        chatAdded();
      }
    }
  };

  const editChat = () => {
    setDisabled(false);
  };

  const saveChat = async () => {
    setDisabled(true);

    const response = await fetch(
      `https://api.doubleornothingyoyos.com/updateChat/`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: chat._id,
          userID: chat.userID,
          chat: ipt.current.value,
          tags: chat.tags,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (responseData.message === "Chat Updated") {
      chatAdded();
    }
  };

  return (
    <>
      {!user && (
        <div className="p-5">
          <Spinner />
        </div>
      )}

      {user && (
        <div className="d-flex justify-content-between">
          <div>
            <div className="d-flex align-items-center small">
              <div className="me-2 text-muted opacity-75">
                {`${formatDate(chat.date)}`}
              </div>
              <div className="me-2">{user}</div>
              <ChatInput
                rf={ipt}
                disabled={disabled}
                defaultValue={chat.chat}
              />
            </div>
          </div>

          {authCtx.user === chat.userID && (
            <div className="d-flex">
              {!disabled && (
                <div className="text-success" role="button" onClick={saveChat}>
                  <i className="fa-solid fa-floppy-disk"></i>
                </div>
              )}

              {disabled && (
                <>
                  <div
                    className="text-warning"
                    role="button"
                    onClick={editChat}>
                    <i className="fa-solid fa-pen-to-square pe-3"></i>
                  </div>

                  <div
                    className="text-danger"
                    role="button"
                    onClick={deleteChat}>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatItem;

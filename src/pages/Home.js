import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/authContext";
import AddChatForm from "../components/AddChatForm/AddChatForm";
import ChatItem from "../components/ChatItem/ChatItem";
import Button from "../components/UI/Button/Button";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [addChat, setAddChat] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const getChats = async () => {
      const response = await fetch(
        "https://api.doubleornothingyoyos.com/readChats/"
      );
      const responseData = await response.json();
      setChats(responseData.chats);
    };

    getChats();
  }, []);

  const showAddChat = () => {
    setAddChat(true);
  };

  const closeAddChat = () => {
    setAddChat(false);
  };

  const chatAdded = async () => {
    const response = await fetch(
      "https://api.doubleornothingyoyos.com/readChats/"
    );
    const responseData = await response.json();
    setChats(responseData.chats);
    setAddChat(false);
  };

  return (
    <div className="p-5 center">
      <div className="p-3 bg-dark rounded">
        {!authCtx.isLoggedIn && (
          <Link
            to="/login"
            className="fs-5 text-danger text-uppercase text-decoration-none">
            Login to chat
          </Link>
        )}

        {authCtx.isLoggedIn && !addChat && (
          <div className="w-25" onClick={showAddChat}>
            <Button colour="btn-success" label="Add Chat Message" />
          </div>
        )}

        {authCtx.isLoggedIn && addChat && (
          <AddChatForm chatAdded={chatAdded} cc={closeAddChat} />
        )}

        <div className="my-3 p-3 border border-light border-opacity-75 rounded shadow">
          {chats.map((chat) => {
            return (
              <ChatItem key={chat._id} chatAdded={chatAdded} chat={chat} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../store/authContext";
import Spinner from "../UI/Spinner/Spinner";

const ChatItem = ({ chat }) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3001/readUser/${chat.userID}/`
      );
      const responseData = await response.json();

      setUser(responseData.user[0].username);
    };

    getUser();
  }, [chat.userID]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getHours()}:${
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes()
    }`;
  };

  const formatTags = (tags) => {
    const newTags = tags.split(", ");
    return newTags.map((tag) => {
      return (
        <span
          key={tag}
          className="me-2 text-primary small text-lowercase"
          role="button">
          #{tag}
        </span>
      );
    });
  };

  return (
    <>
      {!user && (
        <div className="p-5">
          <Spinner />
        </div>
      )}

      {user && (
        <div className="border border-light border-opacity-25 my-3 p-2 rounded shadow">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center small">
                <div className="me-2 text-muted opacity-75">
                  {`${formatDate(chat.date)}`}
                </div>
                <div className="me-2">{user}</div>
                <div className="text-white-50">{chat.chat}</div>
              </div>
              <div>{formatTags(chat.tags)}</div>
            </div>

            {authCtx.user === chat.userID && (
              <div>
                <div className="text-warning" role="button">
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="text-danger" role="button">
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItem;

import "./Comment.css";
import { format, sub, add, getDate } from "date-fns";
import { CreateComment } from "./CreateComment";
import { useState } from "react";
import { createNewCommentAPI } from "../utils/api";

export const Comment = ({ parentComment, replies, userId, isSelected }) => {
  /* Gets the UTC date of the DB and formats to something printable */
  const getDateFormattedAndKnowHowOldItIs = (dateThatIsGettingFormatted) => {
    const dateInObject = new Date(dateThatIsGettingFormatted);
    const formattedDate = format(dateInObject, "Pp");

    return formattedDate;
  };

  /*   console.log(comment); */
  const [isClicked, setIsClicked] = useState(false);
  const handleOnReply = () => {
    setIsClicked(!isClicked);
  };

  /* const addComment = (text, parentId) => {
    console.log("addComment", text, parentId);
    createNewCommentAPI(text, parentId);
  }; */

  return (
    <>
      <article className="news-page-articleWithUserInformation">
        <img src="/octopus.png" alt="Avatar user" className="news-page"></img>
        <ul className="news-page-userData">
          <li className="news-page-liOfUserData">
            <p>{parentComment.id_user}</p>
          </li>
          <li className="news-page-liOfUserData">
            <p>
              {getDateFormattedAndKnowHowOldItIs(parentComment.creation_date)}
            </p>
          </li>
        </ul>
        {userId === parentComment.id_user && (
          <button className="news-page-delete news-page-button">
            Eliminar
          </button>
        )}
      </article>
      <p>{parentComment.comment}</p>
      <footer className="news-page-footerOfComment">
        {/* Pendiente de añadir un ul para meter todos los botones en li */}

        <button className="news-page-button replies-button">See replies</button>
        <button className="news-page-button" onClick={handleOnReply}>
          Responder
        </button>
        <button className="news-page-button">Compartir</button>
      </footer>

      {/* If clicked in reply CreateComment renders the form to create a component  */}
      {isClicked ? (
        <CreateComment submitLabel="Reply" handleSubmit={createNewCommentAPI} />
      ) : null}

      {/* If this comment gets any replays it will be rendered here, if replies doesn't
      exist, nothing will be rendered */}
      {replies.length > 0 && (
        <div className="news-page-reply">
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                parentComment={reply}
                replies={[]}
                userId={userId}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

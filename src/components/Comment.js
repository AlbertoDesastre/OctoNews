import "./Comment.css";
import { format, sub, add, getDate } from "date-fns";
import { CreateComment } from "./CreateComment";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteSomeSortOfPostWithoutBody } from "../utils/api";
import { useParams } from "react-router-dom";

export const Comment = ({
  parentComment,
  replies,
  userId /* , isSelected */,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [error, setError] = useState("");
  const { token, user } = useContext(AuthContext);

  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;

  const handleOnDelete = async (e) => {
    /* Falta meter la parte de la función que refresca automáticamente cuando se elimina.
   Hacer un filtro para setear nuevos comments */
    try {
      await deleteSomeSortOfPostWithoutBody(
        `${process.env.REACT_APP_BACKEND}/news/${id}/${parentComment.id}`,
        token
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOnReply = () => {
    setIsClicked(!isClicked);
  };

  /* Gets the UTC date of the DB and formats to something printable */
  const getFormattedDate = (dateThatIsGettingFormatted) => {
    const dateInObject = new Date(dateThatIsGettingFormatted);
    const formattedDate = format(dateInObject, "Pp");
    return formattedDate;
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
            <p>{getFormattedDate(parentComment.creation_date)}</p>
          </li>
        </ul>
        {user && user.id === parentComment.id_user ? (
          <button
            className="news-page-delete news-page-button"
            onClick={handleOnDelete}
          >
            Eliminar
          </button>
        ) : null}
      </article>
      <p>{parentComment.comment}</p>
      <footer className="news-page-footerOfComment">
        {replies.length > 0 ? (
          <button
            className="news-page-button replies-button"
            onClick={() => {
              setShowReplies(!showReplies);
            }}
          >
            See replies
          </button>
        ) : null}
        <button className="news-page-button" onClick={handleOnReply}>
          Responder
        </button>
        <button className="news-page-button">Compartir</button>
      </footer>
      {/* If clicked in reply CreateComment renders the form to create a component  */}
      {isClicked ? (
        <CreateComment
          submitLabel="Reply"
          /* handleSubmit={createNewCommentAPI} */
          color="whitesmoke"
        />
      ) : null}
      {/* If this comment gets any replays it will be rendered here, if replies doesn't
      exist, nothing will be rendered */}

      {replies.length > 0 && showReplies && (
        <div className="news-page-reply">
          {replies.map((reply) => {
            return (
              <div className="news-page-comment news-page-comment-reply">
                <Comment
                  key={reply.id}
                  parentComment={reply}
                  replies={[]}
                  userId={userId}
                  /*  isSelected={isSelected} */
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

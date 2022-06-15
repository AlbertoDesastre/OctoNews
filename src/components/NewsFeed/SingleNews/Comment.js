import "./Comment.css";
import { format, sub, add, getDate } from "date-fns";
import { CreateComment } from "./CreateComment";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deleteSomeSortOfPostWithoutBody } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { Error } from "../../Error";

export const Comment = ({
  parentComment,
  parentCommentID = null,
  replies,
  userId,
  deleteSomeCommentAndRefreshIt,
  addAdditionalComment,
  avatar,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [error, setError] = useState("");
  const { token, user } = useContext(AuthContext);

  /* Setting the "parentCommentID" to null in props, in the lane 11 it's extremely important.
  We only want one level of replied comments, we don't want the comments nested inside each other.
  That's why our ROOT comment, the one that it's born with "id_reply_message=null" will
  received his parentCommentID set to null by defect.
  However, when a Reply Comment is beeing replied, this parentCommentID gets a value, and the value
  we are giving to him it's the value of the Root Comment id. 
  We can say that, in a Reply Comment that's beeing replied, the second reply it's actually getting borrowed his id_reply_message from 
  the comment that it's now replying.*/
  const parentId = parentCommentID ? parentCommentID : parentComment.id;

  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;

  const handleOnDelete = async (e) => {
    try {
      await deleteSomeSortOfPostWithoutBody(
        `${process.env.REACT_APP_BACKEND}/news/${id}/${parentComment.id}`,
        token
      );
      deleteSomeCommentAndRefreshIt(parentComment.id);
    } catch (error) {
      error.id_of_error_comment = parentComment.id;
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

  return (
    <>
      <article className="news-page-articleWithUserInformation">
        <img
          src={
            avatar
              ? `${process.env.REACT_APP_BACKEND}/uploads/users/${avatar}`
              : "/svg-icons/user-login-default-icon.svg"
          }
          alt="Avatar user"
          className="news-page"
        ></img>
        <ul className="news-page-userData">
          <li className="news-page-liOfUserData">
            <p>{parentComment.name}</p>
          </li>
          <li className="news-page-liOfUserData news-page-creation-date-comment">
            {parentComment.creation_date ? (
              <p>{getFormattedDate(parentComment.creation_date)}</p>
            ) : null}
          </li>
        </ul>
        {user && user.id === parentComment.id_user ? (
          <button
            className="news-page-delete news-page-button"
            onClick={handleOnDelete}
          >
            Delete
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
        {user ? (
          <button className="news-page-button-reply" onClick={handleOnReply}>
            Reply
          </button>
        ) : null}
      </footer>

      {error && parentComment.id === error.id_of_error_comment ? (
        <Error className={"comments-error"} error={error} />
      ) : null}

      {/* If clicked in reply CreateComment renders the form to create a component  */}
      {isClicked ? (
        <CreateComment
          submitLabel="Reply"
          color="whitesmoke"
          addAdditionalComment={addAdditionalComment}
          parentCommentID={parentId}
          idName="news-page-formToSubmitACommentInReplyMode"
          avatar={avatar}
        />
      ) : null}

      {/* If this comment gets any replys it will be rendered here, if replies doesn't
      exist, nothing will be rendered */}
      {replies.length > 0 && showReplies && (
        <div className="news-page-reply">
          {replies.map((reply, index) => {
            return (
              <div
                key={index}
                className="news-page-comment news-page-comment-reply"
              >
                <Comment
                  key={reply.id}
                  parentComment={reply}
                  parentCommentID={parentCommentID}
                  replies={[]}
                  userId={userId}
                  addAdditionalComment={addAdditionalComment}
                  deleteSomeCommentAndRefreshIt={deleteSomeCommentAndRefreshIt}
                  avatar={avatar}
                  className="news-page-comment news-page-comment-reply"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

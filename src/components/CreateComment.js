import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postFormData, postJson } from "../utils/api";
import "./CreateComment.css";

export const CreateComment = ({
  submitLabel,
  addAdditionaComment /* , handleSubmit */,
  id_reply_message,
  idName,
}) => {
  /* submitLabel es para que en el boton ponga lo que pone submitLabel, como reply or edit */
  const { user, token } = useContext(AuthContext);
  const [textValue, setTextValue] = useState("");
  /* Pendiente de usar esto para cargar animaciónes de enviando comentario, un <p> con error, etc... */
  const [error, setError] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const isThereAnyText = textValue.length === 0;

  const idFromParamsThatComesAsObject = useParams();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { id } = idFromParamsThatComesAsObject;
    const url = `${process.env.REACT_APP_BACKEND}/news/${id}/comment`;

    /* Esto del submit con reply no funciona, me dice que id user no es válido */
    if (submitLabel === "Reply") {
      try {
        setSendingComment(true);
        const data = {
          comment: textValue,
          id_user: user.id,
          id_reply_message: id_reply_message,
          creation_date: new Date(),
        };

        const dataStringified = JSON.stringify(data);

        const newComment = await postJson(url, dataStringified, token);
        addAdditionaComment(newComment);

        setTextValue("");
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setSendingComment(false);
      }
    } else {
      try {
        setSendingComment(true);

        const data = new FormData(e.target);
        const newComment = await postFormData(url, data, token);
        addAdditionaComment(newComment);

        setTextValue("");
      } catch (error) {
        setError(error.message);
      } finally {
        setSendingComment(false);
      }
    }
  };

  return (
    <>
      <form
        method="POST"
        className="news-page-formToSubmitAComment"
        id={idName ? idName : null}
        onSubmit={handleOnSubmit}
      >
        <img src="/octopus.png" alt="Avatar user" className="news-page"></img>
        <label htmlFor="leaveACommentInput">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            maxLength="2000"
            placeholder="Leave a comment..."
            id="comment"
            name="comment"
          ></textarea>
        </label>
        <button type="submit" disabled={isThereAnyText}>
          {submitLabel}
        </button>
      </form>
      {sendingComment ? <p>Sending comment</p> : null}
      {error ? <p>{error.message}</p> : null}
    </>
  );
};

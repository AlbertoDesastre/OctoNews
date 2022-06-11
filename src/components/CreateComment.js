import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postFormData, postJson } from "../utils/api";
import "./CreateComment.css";

export const CreateComment = ({
  submitLabel,
  addAdditionaComment /* , handleSubmit */,
}) => {
  /* submitLabel es para que en el boton ponga lo que pone submitLabel, como reply or edit */
  const { token } = useContext(AuthContext);
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
  };

  return (
    <>
      <form
        method="POST"
        className="news-page-formToSubmitAComment"
        id="news-page-formToSubmitAComment"
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
    </>
  );
};

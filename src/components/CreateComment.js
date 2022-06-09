import { useState } from "react";
import "./CreateComment.css";

export const CreateComment = ({ submitLabel, handleSubmit }) => {
  /* submitLabel es para que en el boton ponga lo que pone submitLabel, como reply or edit */

  const [textValue, setTextValue] = useState("");
  const isThereAnyText = textValue.length === 0;

  const handleOnChange = (e) => {
    e.preventDefault();
    handleSubmit(textValue);
    setTextValue("");
  };

  return (
    <>
      <form
        method="POST"
        className="news-page-formToSubmitAComment"
        id="news-page-formToSubmitAComment"
        onSubmit={handleOnChange}
      >
        <img src="/octopus.png" alt="Avatar user" className="news-page"></img>
        <label htmlFor="leaveACommentInput">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            maxLength="2000"
            placeholder="Leave a comment..."
            id="leaveACommentInput"
          ></textarea>
        </label>
        <button type="submit" disabled={isThereAnyText}>
          {submitLabel}
        </button>
      </form>
    </>
  );
};

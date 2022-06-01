import "./CreateComment.css";

export const CreateComment = () => {
  const handleOnChange = (e) => {
    e.preventDefault();
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
          <input
            type="text"
            maxLength="2000"
            placeholder="Leave a comment..."
            id="leaveACommentInput"
          ></input>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

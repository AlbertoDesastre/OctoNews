import "./CreateComment.css";

export const CreateComment = () => {
  const handleOnChange = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        method="POST"
        className="FormToSubmitAComment"
        id="FormToSubmitAComment"
        onSubmit={handleOnChange}
      >
        <img src="../../public/favicon.ico" alt="Avatar user"></img>
        <label htmlFor="leaveACommentInput">
          <input
            type="text"
            maxlength="2000"
            placeholder="Leave a comment..."
            id="leaveACommentInput"
          ></input>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

import "./CommentsBanner.css";

export const CommentsBanner = () => {
  return (
    <section className="news-page-sectionOfCommentsBanner">
      <div className="news-page-divCommentsBanner">
        <h2>COMMENTS</h2>
        <select
          className="news-page-buttonOrInputWithBorderRadius"
          defaultValue={"New"}
        >
          <option>New</option>
          <option>Controversial</option>
        </select>
      </div>
      <ul>
        <li key={"algo"} className="news-page-comment">
          <article className="news-page-articleWithUserInformation">
            <img
              src="/octopus.png"
              alt="Avatar user"
              className="news-page"
            ></img>
            <ul className="news-page-userData">
              <li className="news-page-liOfUserData">
                <p>usuario no se quién</p>
              </li>
              <li className="news-page-liOfUserData">
                <p>3d</p>
              </li>
            </ul>
            <button className="news-page-delete news-page-button">
              Eliminar
            </button>
          </article>
          <p>Comentario en sí mismo</p>
          <footer className="news-page-footerOfComment">
            <button className="news-page-button">Responder</button>
            <button className="news-page-button">Compartir</button>
          </footer>
        </li>
        {/* Si tiene respuestas habrá que hacer algo así:
          <ul>
            <li>
            opino que eres tonto
            </li>
          </ul>
          */}
      </ul>
    </section>
  );
};

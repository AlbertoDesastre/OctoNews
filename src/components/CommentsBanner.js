import "./CommentsBanner.css";

export const CommentsBanner = () => {
  return (
    <section className="SectionOfCommentsBanner">
      <div>
        <h2>COMMENTS</h2>
        <select className="ButtonOrInputWithBorderRadius">
          <option selected>New</option>
          <option>Controversial</option>
        </select>
      </div>
      <ul>
        <li key={"algo"} className="Comment">
          <article className="ArticleWithUserInformation">
            <img src="url de imagen" alt="A"></img>
            <ul className="UserData">
              <li className="LiOfUserData">
                <p>usuario no se quién</p>
              </li>
              <li className="LiOfUserData">
                <p>3d</p>
              </li>
            </ul>
          </article>
          <p>Comentario en sí mismo</p>
          <footer className="FooterOfComment">
            <button>Responder</button>
            <button>Compartir</button>
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

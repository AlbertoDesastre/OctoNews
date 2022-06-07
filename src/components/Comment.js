import "./Comment.css";

export const Comment = (/* { props } */) => {
  return (
    <>
      <li className=" news-page-comment">
        <article className="news-page-articleWithUserInformation">
          <img src="/octopus.png" alt="Avatar user" className="news-page"></img>
          <ul className="news-page-userData">
            <li className="news-page-liOfUserData">
              <p>hola</p>
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
          {/* Pendiente de añadir un ul para meter todos los botones en li */}
          <button className="news-page-button replies-button">
            See replies
          </button>
          <button className="news-page-button">Responder</button>
          <button className="news-page-button">Compartir</button>
        </footer>

        {/* <ul>
          <li>
            <button className="news-page replies-button">See replies</button>
          </li> */}
        {/*
Esto debe ser un renderizado CONDICIONAL

<li>
<Comment />
</li> */}
        {/* </ul> */}
      </li>
    </>
  );
};

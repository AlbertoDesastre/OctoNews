import "./NotFound.css";

export const NotFound = () => {
  return (
    <>
      <article className="article-not-found">
        <h2 className="h2-not-found">Page not found.</h2>
        <ul className="ul-not-found">
          <li className="li-not-found">
            <img
              src="/dead_octopus.png"
              alt="Cartoon octopus dead"
              className="img-not-found"
            ></img>
          </li>
          <li className="li-not-found">
            <p>The page you are searching doesn't exist.</p>
          </li>
          <li className="li-not-found">
            <p className="go-back-home">
              Would you like to go back <a href="/">home?</a>
            </p>
          </li>
        </ul>
      </article>
    </>
  );
};

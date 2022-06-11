import { Header } from "../components/Header";
import { NewsCards } from "../components/NewsCards";
import { LoginOrRegisterBox } from "../components/LoginOrRegisterBox";
import { CreateComment } from "../components/CreateComment";
import { CommentsBanner } from "../components/CommentsBanner";
import { useParams } from "react-router-dom";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const News = () => {
  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;
  const { token } = useContext(AuthContext);

  const [news, setNews, isLoading, error, , deleteSomeNewAndRefreshIt] =
    useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}`);

  const [
    commentsArray,
    setCommentsArray,
    isLoadingForComments,
    errorForComments,
    addAdditionalValue,
    deleteSomeValueAndRefreshIt,
  ] = useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}/comments`);
  /* Meter gestión de errores */

  return (
    /* Este div me hace falta para poder separar las 
    secciones */
    <main>
      <div className="news-page">
        <Header />
        {!isLoading && (
          <NewsCards
            newsId={news.id}
            username={news.id_user}
            date={news.creation_date}
            title={news.title}
            image={news.image}
            description={news.introduction_text}
            text={news.news_text}
            votes={news.votes}
            category={news.id_category}
            className="news-page"
            deleteSomeNewAndRefreshIt={deleteSomeNewAndRefreshIt}
          />
        )}
        {/* Cambiar esto por un filter de id categoria e id noticia. */}

        {token === null ? <LoginOrRegisterBox /> : null}
        <CreateComment
          submitLabel="Comment"
          addAdditionalComment={addAdditionalValue}
        />

        {commentsArray.result ? (
          <CommentsBanner
            allComments={commentsArray.result}
            setComments={setCommentsArray}
            deleteSomeCommentAndRefreshIt={deleteSomeValueAndRefreshIt}
          />
        ) : null}
      </div>
    </main>
  );
};

import { Header } from "../components/Header";
import { NewsCards } from "../components/NewsCards";
import { LoginOrRegisterBox } from "../components/LoginOrRegisterBox";
import { CreateComment } from "../components/CreateComment";
import { CommentsBanner } from "../components/CommentsBanner";
import { useParams } from "react-router-dom";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const News = () => {
  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;

  const [news, setNews, isLoading, error, addAdditionalValue] =
    useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}`);

  const [
    commentsArray,
    setCommentsArray,
    isLoadingForComments,
    errorForComments,
  ] = useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}/comments`);
  /* Meter gestión de errores */

  console.log(commentsArray);

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
            /* BORRAR ESTO DE TRU AL TERMINAR Y PONER value.image */
            image={news.image}
            description={news.introduction_text}
            text={news.news_text}
            votes={news.votes}
            category={news.id_category}
            className="news-page"
          />
        )}
        {/* Cambiar esto por un filter de id categoria e id noticia. */}
        <LoginOrRegisterBox />
        <CreateComment
          submitLabel="Comment"
          addAdditionalComment={addAdditionalValue}
        />

        {commentsArray.result ? (
          <CommentsBanner
            allComments={commentsArray.result}
            setComments={setCommentsArray}
          />
        ) : null}
      </div>
    </main>
  );
};

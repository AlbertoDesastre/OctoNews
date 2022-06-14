import { Header } from "../components/Header";
import { NewsCards } from "../components/NewsFeed/NewsCards";
import { LoginOrRegisterBox } from "../components/NewsFeed/SingleNews/LoginOrRegisterBox";
import { CreateComment } from "../components/NewsFeed/SingleNews/CreateComment";
import { CommentsBanner } from "../components/NewsFeed/SingleNews/CommentsBanner";
import { useParams } from "react-router-dom";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const News = () => {
  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;
  const { token } = useContext(AuthContext);

  const [
    news,
    setNews,
    isLoadingNews,
    errorOnNews,
    ,
    deleteSomeNewAndRefreshIt,
  ] = useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}`);

  /*  console.log(news); */

  const [category, , isLoadingCategory, errorOnCategory] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories/${news.id_category}`
  );

  const [
    commentsArray,
    setCommentsArray,
    isLoadingForComments,
    errorForComments,
    addAdditionalValue,
    deleteSomeValueAndRefreshIt,
  ] = useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}/comments`);

  console.log(news);

  /* Meter gestión de errores */
  return (
    /* Este div me hace falta para poder separar las 
    secciones */
    <main>
      <div className="news-page">
        <Header />
        {!isLoadingNews && news.id && (
          <NewsCards
            newsId={news.id}
            username={news.id_user}
            date={news.creation_date}
            title={news.title}
            image={news.image}
            comments={news.comments}
            description={news.introduction_text}
            text={news.news_text}
            votes={news.votes}
            category={category}
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
            addAdditionalComment={addAdditionalValue}
          />
        ) : null}
      </div>
    </main>
  );
};

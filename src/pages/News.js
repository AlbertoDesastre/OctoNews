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

  const [value, setValue, isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news/${id}`
  );

  const [
    commentsArray,
    setCommentsArray,
    isLoadingForComments,
    errorForComments,
  ] = useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}/comments`);

  console.log(commentsArray);

  return (
    /* Este div me hace falta para poder separar las 
    secciones */
    <main>
      <div className="news-page">
        <Header />
        <NewsCards
          newsId={value.id}
          username={value.id_user}
          date={value.creation_date}
          title={value.title}
          /* BORRAR ESTO DE TRU AL TERMINAR Y PONER value.image */
          image={true}
          description={value.introduction_text}
          text={value.news_text}
          votes={value.votes}
          category={value.id_category}
          className="news-page"
        />
        {/* Cambiar esto por un filter de id categoria e id noticia. */}
        <LoginOrRegisterBox />
        <CreateComment />
        <CommentsBanner props={commentsArray} />
      </div>
    </main>
  );
};

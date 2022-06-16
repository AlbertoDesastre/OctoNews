import { Header } from "../components/Header";
import { NewsCards } from "../components/NewsFeed/NewsCards";
import { LoginOrRegisterBox } from "../components/NewsFeed/SingleNews/LoginOrRegisterBox";
import { CreateComment } from "../components/NewsFeed/SingleNews/CreateComment";
import { CommentsBanner } from "../components/NewsFeed/SingleNews/CommentsBanner";
import { useParams } from "react-router-dom";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { NotFound } from "./NotFound";

export const News = () => {
  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;
  const { token, user } = useContext(AuthContext);

  const [news, , isLoadingNews, errorOnNews, , deleteSomeNewsAndRefreshIt] =
    useGetRemoteData(`${process.env.REACT_APP_BACKEND}/news/${id}`);

  const [category] = useGetRemoteData(
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

  return (
    <main>
      <div className="news-page">
        {isLoadingNews ? (
          <Loading className={"create-comment-loading"} />
        ) : !news.id ? (
          <NotFound />
        ) : (
          <>
            <Header />
            {errorOnNews ? (
              <Error className={"single-news-error"} error={errorOnNews} />
            ) : null}

            {!isLoadingNews && news.id && (
              <>
                <NewsCards
                  newsId={news.id}
                  username={news.name}
                  usernameId={news.id_user}
                  date={news.creation_date}
                  title={news.title}
                  image={news.image}
                  comments={news.comments}
                  description={news.introduction_text}
                  text={news.news_text}
                  votes={news.votes}
                  category={category}
                  className="news-page"
                  deleteSomeNewAndRefreshIt={deleteSomeNewsAndRefreshIt}
                />
                {!token ? <LoginOrRegisterBox /> : null}
              </>
            )}

            {token ? (
              <CreateComment
                submitLabel="Comment"
                addAdditionalComment={addAdditionalValue}
                userAvatar={user?.avatar ? user.avatar : null}
              />
            ) : null}

            {errorForComments ? (
              <Error className={"single-news-error"} error={errorForComments} />
            ) : null}

            {isLoadingForComments ? (
              <Loading className={"create-comment-loading"} />
            ) : null}
            {commentsArray.result ? (
              <CommentsBanner
                allComments={commentsArray.result}
                setComments={setCommentsArray}
                deleteSomeCommentAndRefreshIt={deleteSomeValueAndRefreshIt}
                addAdditionalComment={addAdditionalValue}
              />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
};

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useGetRemoteData } from "../../hooks/useGetRemoteData";
import {
  deleteSomeSortOfPostWithoutBody,
  voteNewsService,
} from "../../utils/api";
import { capitalize } from "../../utils/capitalizeString";
import { copyNewsLinkToClipBoard } from "../../utils/copyNewsLinkToClipBoard";

import "./NewsCards.css";

export const NewsCards = ({
  newsId,
  username,
  usernameId,
  date,
  title,
  description,
  text,
  image,
  votes,
  comments,
  className,
  category,
  deleteSomeNewsAndRefreshIt,
}) => {
  return (
    <article
      className={className ? className : undefined}
      style={category && { borderTop: `10px solid ${category.color}` }}
    >
      <hr />
      <NewsBody
        className={className}
        username={username}
        date={date}
        category={category}
        image={image}
        newsId={newsId}
        title={title}
        text={text}
        description={description}
      />
      {className === "news-page" && (
        <DeleteEditNewsButtons
          newsId={newsId}
          deleteSomeNewsAndRefreshIt={deleteSomeNewsAndRefreshIt}
          usernameId={usernameId}
        />
      )}
      <FooterNewsCard
        className={className}
        votes={votes}
        comments={comments}
        newsId={newsId}
      />
    </article>
  );
};

const NewsBody = ({
  className,
  username,
  date,
  category,
  image,
  newsId,
  title,
  text,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <p className="author-news">
        Published by {username} {new Date(date).toLocaleString()} ago
      </p>
      {category && (
        <p
          className={className ? className + "-category" : "category-news"}
          style={{ border: `3px solid ${category.color}` }}
        >
          {capitalize(category.name)}
        </p>
      )}
      {image ? (
        <img
          className="img-news"
          src={`${process.env.REACT_APP_BACKEND}/uploads/news/${image}`}
          alt="news img"
          onClick={() => navigate(`/news/${newsId}`)}
        />
      ) : (
        ""
      )}

      <p
        className={className ? className : "title-news"}
        onClick={() => navigate(`/news/${newsId}`)}
        id={className === "news-page" ? "news-page-title" : undefined}
      >
        {title}
      </p>
      <p
        className="desc-news"
        id={className === "news-page" ? "news-page-text" : undefined}
      >
        {className ? text : description}
      </p>
    </>
  );
};

const DeleteEditNewsButtons = ({
  newsId,
  deleteSomeNewsAndRefreshIt,
  usernameId,
}) => {
  const { user, token } = useContext(AuthContext);
  const idFromParamsThatComesAsObject = useParams();
  const { id } = idFromParamsThatComesAsObject;
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleOnDelete = async (e) => {
    if (window.confirm("Are you sure you want to delete this new?")) {
      try {
        await deleteSomeSortOfPostWithoutBody(
          `${process.env.REACT_APP_BACKEND}/news/${id}`,
          token
        );

        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleOnEdit = () => {
    navigate(`/edit/${newsId}`);
  };

  return (
    <section className="news-page news-page-deleteedit">
      <ul className="news-page news-page-ul-for-buttons-edit-delete">
        <li className="news-page  news-page-button-li-of-deleteedit">
          {/* cambiar username por prop que tenga user id de la news */}
          {user && user.id === usernameId ? (
            <button
              className="news-page-edit news-page-button news-page-inside-new-delete"
              onClick={handleOnDelete}
            >
              Delete news
            </button>
          ) : null}
        </li>
        <li className="news-page  news-page-button-li-of-deletedit">
          {/* cambiar username por prop que tenga user id de la news */}
          {user && user.id === usernameId ? (
            <button
              className="news-page-edit news-page-button news-page-inside-new-edit"
              onClick={handleOnEdit}
            >
              Edit news
            </button>
          ) : null}
        </li>
      </ul>
    </section>
  );
};

const FooterNewsCard = ({ className, votes, comments, newsId }) => {
  const [isDropdownShare, setIsDropdownShare] = useState(false);

  const handleDropdown = (e) => {
    setIsDropdownShare(!isDropdownShare);
    copyNewsLinkToClipBoard(newsId);
  };

  useEffect(() => {
    let countdownToHide;
    if (isDropdownShare) {
      countdownToHide = setTimeout(() => {
        setIsDropdownShare(false);
      }, 1000);
    }

    return () => {
      clearTimeout(countdownToHide);
    };
  }, [isDropdownShare]);

  return (
    <div
      className={className ? "news-page" : "action-news"}
      id={className ? "action-from-news" : undefined}
    >
      <button
        className={className ? className + " share" : "share"}
        type="button"
        onClick={handleDropdown}
      />
      <DropdownMenu
        isDropdown={isDropdownShare}
        idOfDropDown={
          className === "news-page" ? "drop-down-on-news-page" : null
        }
      />
      <button className="comments" type="button">
        {comments}
      </button>
      <LikeDislikeButtons votes={votes} idNews={newsId} />
    </div>
  );
};

const LikeDislikeButtons = ({ votes, idNews }) => {
  const [userVote, setUserVote] = useState();
  const navigate = useNavigate();
  const [votesQuantity, setVotesQuantity] = useState(Number(votes));
  const [error, setError] = useState();
  const { user, token } = useContext(AuthContext);
  const [newsVotes] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news/${idNews}/votes`
  );

  useEffect(() => {
    if (user) {
      const voteData = newsVotes.find((votes) => {
        return votes.id_user === user.id;
      });
      if (voteData) setUserVote(voteData.vote);
    }
  }, [newsVotes, user]);

  const handleOnClickDislike = async () => {
    try {
      if (token) {
        let vote;
        if (userVote !== -1) {
          vote = { vote: -1 };
          await voteNewsService({ vote, token, idNews });
          setUserVote(-1);
          if (userVote === 1) {
            setVotesQuantity(votesQuantity - 2);
          } else {
            setVotesQuantity(votesQuantity - 1);
          }
        } else {
          vote = { vote: 0 };
          await voteNewsService({ vote, token, idNews });
          setUserVote(0);
          setVotesQuantity(votesQuantity + 1);
        }
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleOnClickLike = async () => {
    try {
      if (token) {
        let vote;
        if (userVote !== 1) {
          vote = { vote: 1 };
          await voteNewsService({ vote, token, idNews });
          setUserVote(1);
          if (userVote === -1) {
            setVotesQuantity(votesQuantity + 2);
          } else {
            setVotesQuantity(votesQuantity + 1);
          }
        } else {
          vote = { vote: 0 };
          await voteNewsService({ vote, token, idNews });
          setUserVote(0);
          setVotesQuantity(votesQuantity - 1);
        }
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button
        className={userVote === 1 ? "like" : "no-like"}
        type="button"
        onClick={handleOnClickLike}
      />
      <p className="votes">{votesQuantity}</p>
      <button
        className={userVote === -1 ? "dislike" : "no-dislike"}
        type="button"
        onClick={handleOnClickDislike}
      />
    </>
  );
};

const DropdownMenu = ({ isDropdown, idOfDropDown }) => {
  return (
    <div
      className={
        isDropdown
          ? "dropdown-content-newscard dropdown-newscard"
          : "dropdown-newscard"
      }
      id={idOfDropDown}
    >
      <button>Link copied!</button>
    </div>
  );
};

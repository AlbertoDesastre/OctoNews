import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useGetRemoteData } from "../../../hooks/useGetRemoteData";
import { voteNewsService } from "../../../utils/api";

export const LikeDislikeButtons = ({ votes, idNews }) => {
  const [userVote, setUserVote] = useState();
  const navigate = useNavigate();
  const [votesQuantity, setVotesQuantity] = useState(Number(votes));
  const [, setError] = useState();
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

import "./CommentsBanner.css";
import { Comment } from "./Comment.js";
import { useEffect, useState } from "react";
import { CreateComment } from "./CreateComment";
import { createNewCommentAPI } from "../utils/api";

export const CommentsBanner = ({
  allComments,
  setComments,
  deleteSomeCommentAndRefreshIt,
}) => {
  /* console.log(comments); */

  const [isPolemicSelected, setIsPolemicSelected] = useState(false);

  const parentComment = allComments
    .filter((comment) => comment.id_reply_message === null)
    .sort(
      (a, b) =>
        new Date(b.creation_date).getTime() -
        new Date(a.creation_date).getTime()
    );

  const getRepliesComments = (commentId) => {
    return allComments
      .filter(
        (commentsFromBackend) =>
          commentsFromBackend.id_reply_message === commentId
      )
      .sort(
        (a, b) =>
          new Date(a.creation_date).getTime() -
          new Date(b.creation_date).getTime()
      );
  };

  /* Work in progress to show comments with more replies first */

  /*  if (isPolemicSelected) {
    const parentComment = allComments
      .filter((comment) => comment.id_reply_message !== null)
      .sort((a, b) => b.id_reply_message - a.id_reply_message);

    const getRepliesComments = (commentId) => {
      return allComments
        .filter(
          (commentsFromBackend) =>
            commentsFromBackend.id_reply_message === commentId
        )
        .sort(
          (a, b) =>
            new Date(a.creation_date).getTime() -
            new Date(b.creation_date).getTime()
        );
    };
  } else {
  } */

  /* This will add comments. Unfinished. */

  return (
    <section className="news-page-sectionOfCommentsBanner">
      <div className="news-page-divCommentsBanner">
        <h2>COMMENTS</h2>
        <select
          className="news-page-buttonOrInputWithBorderRadius"
          defaultValue={"New"}
        >
          <option onSelect={() => setIsPolemicSelected(false)}>New</option>
          <option onSelect={() => setIsPolemicSelected(true)}>
            Controversial
          </option>
        </select>
      </div>
      <ul>
        {parentComment.map((parentComment) => {
          return (
            <li key={parentComment.id} className="news-page-comment">
              <Comment
                parentComment={parentComment}
                replies={getRepliesComments(parentComment.id)}
                userId={1}
                deleteSomeCommentAndRefreshIt={deleteSomeCommentAndRefreshIt}
                /* isSelected={isSelected} */
              ></Comment>
              {/*  <CreateComment submitLabel="Reply" handleSubmit={addComment} /> */}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

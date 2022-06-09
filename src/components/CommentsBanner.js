import "./CommentsBanner.css";
import { Comment } from "./Comment.js";
import { useEffect, useState } from "react";
import { CreateComment } from "./CreateComment";
import { createNewCommentAPI } from "../utils/api";

export const CommentsBanner = ({ allComments, setComments }) => {
  /* console.log(comments); */

  const [isSelected, setIsSelected] = useState(true);

  const parentComment = allComments
    .filter((comment) => comment.id_reply_message === null)
    .sort(
      (a, b) =>
        new Date(a.creation_date).getTime() -
        new Date(b.creation_date).getTime()
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

  /* This will add comments. Unfinished. */
  const addComment = (text, parentId) => {
    console.log("addComment", text, parentId);
    createNewCommentAPI(text, parentId);
  };

  return (
    <section className="news-page-sectionOfCommentsBanner">
      <div className="news-page-divCommentsBanner">
        <h2>COMMENTS</h2>
        <select
          className="news-page-buttonOrInputWithBorderRadius"
          defaultValue={"New"}
        >
          <option>New</option>
          <option>Controversial</option>
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
                isSelected={isSelected}
              ></Comment>
              {/*  <CreateComment submitLabel="Reply" handleSubmit={addComment} /> */}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

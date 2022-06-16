import "./CommentsBanner.css";
import { Comment } from "./Comment.js";
import { useState } from "react";

export const CommentsBanner = ({
  allComments,
  deleteSomeCommentAndRefreshIt,
  addAdditionalComment,
}) => {
  const [isPolemicSelected, setIsPolemicSelected] = useState(false);

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

  const commentList = allComments.reduce((acc, curr) => {
    if (curr.id_reply_message) {
      const parent = acc.find((c) => c.id === curr.id_reply_message);

      if (parent) {
        parent.children.push(curr);
      }
    } else {
      acc.push({ ...curr, children: [] });
    }

    return acc;
  }, []);

  const comments = isPolemicSelected
    ? commentList.sort((a, b) => b.children.length - a.children.length)
    : commentList.sort(
        (a, b) =>
          new Date(b.creation_date).getTime() -
          new Date(a.creation_date).getTime()
      );
  return (
    <section className="news-page-sectionOfCommentsBanner">
      <div className="news-page-divCommentsBanner">
        <h2>COMMENTS</h2>
        <select
          className="news-page-buttonOrInputWithBorderRadius"
          defaultValue={"New"}
          onChange={(e) => setIsPolemicSelected(e.target.value === "1")}
        >
          <option value="0">New</option>
          <option value="1">Controversial</option>
        </select>
      </div>
      <ul>
        {comments.map((parentComment) => {
          return (
            <li key={parentComment.id} className="news-page-comment">
              <Comment
                parentComment={parentComment}
                parentCommentID={parentComment.id}
                replies={getRepliesComments(parentComment.id)}
                userId={1}
                deleteSomeCommentAndRefreshIt={deleteSomeCommentAndRefreshIt}
                addAdditionalComment={addAdditionalComment}
                userAvatar={parentComment.avatar}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

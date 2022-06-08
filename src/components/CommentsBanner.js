import "./CommentsBanner.css";
import { Comment } from "./Comment.js";

export const CommentsBanner = ({ comments }) => {
  console.log(comments);
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
        {comments.map((comment) => {
          return (
            <li key={comment.id} className="news-page-comment">
              <Comment comment={comment} />
            </li>
          );
        })}
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ul>
    </section>
  );
};

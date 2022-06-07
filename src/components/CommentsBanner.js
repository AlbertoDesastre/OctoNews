import "./CommentsBanner.css";
import { Comment } from "./Comment.js";

export const CommentsBanner = (/* { props } */) => {
  // console.log(props.result);
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
        {/* {props.result.map((comment) => {
          return (
            <li key={comment} className="news-page-comment">
              <Comment props={comment} />
            </li>
          );
        })} */}
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ul>
    </section>
  );
};

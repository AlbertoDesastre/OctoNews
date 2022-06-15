import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { deleteSomeSortOfPostWithoutBody } from "../../../utils/api";

export const DeleteEditNewsButtons = ({
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

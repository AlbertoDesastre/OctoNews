import { useContext, useEffect, useState } from "react";
import { Error } from "../Error";
import { capitalize } from "../../utils/capitalizeString";
import { AuthContext } from "../../context/AuthContext";
import { postFormData, putFormData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./FormNews.css";

export const FormNews = ({
  mode,
  categoriesData,
  categoryLoading,
  categoryError,
  newsData,
  newsError,
}) => {
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ name: "" });
  const [imageUpload, setImageUpload] = useState();
  const [imageNews, setImageNews] = useState();
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  let labelImageStyles = {
    background: `url("http://localhost:3000/svg-icons/image-upload-icon.svg") 0px center / cover no-repeat `,
  };

  if (imageUpload) {
    labelImageStyles = {
      background: `url(${URL.createObjectURL(
        imageUpload
      )}) 0px center / cover no-repeat `,
      border: "2px solid gray",
    };
  } else if (imageNews) {
    labelImageStyles = {
      background: `url(${imageNews}) 0px center / cover no-repeat `,
      border: "2px solid gray",
    };
  }

  useEffect(() => {
    if (newsData) {
      setTitleInput(newsData.title);
      setTextInput(newsData.news_text);
      setImageNews(
        newsData.image &&
          `${process.env.REACT_APP_BACKEND}/uploads/news/${newsData.image}`
      );
    }
  }, [newsData]);

  const handleOnSubmitPost = async (e) => {
    e.preventDefault();
    setError(null);
    const news = new FormData(e.target);
    news.append("introduction", textInput.slice(0, 50) + "...");
    if (imageUpload) news.append("image", imageUpload);

    try {
      const response = await postFormData(
        `${process.env.REACT_APP_BACKEND}/news`,
        news,
        token
      );
      navigate(`/news/${response.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOnSubmitEdit = async (e) => {
    e.preventDefault();
    setError("");
    const newsEdited = new FormData(e.target);
    newsEdited.append("introduction", textInput.slice(0, 50) + "...");
    if (imageUpload) newsEdited.append("image", imageUpload);

    try {
      await putFormData(
        `${process.env.REACT_APP_BACKEND}/news/${newsData.id}`,
        newsEdited,
        token
      );
      navigate(`/news/${newsData.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      className="submit-page"
      onSubmit={mode === "edit" ? handleOnSubmitEdit : handleOnSubmitPost}
    >
      {categoryError ? (
        <Error className="submit-page error" error={categoryError} />
      ) : (
        !categoryLoading &&
        categoriesData && (
          <fieldset className="submit-category">
            <select
              name="category"
              id="category"
              value={selectedCategory.name}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option disabled value="">
                Choose a category
              </option>

              {categoriesData.map((category) => (
                <option key={category.id} value={category.name}>
                  {capitalize(category.name)}
                </option>
              ))}
            </select>
          </fieldset>
        )
      )}
      {newsError ? (
        <Error className="edit-page error" error={newsError} />
      ) : (
        <>
          <fieldset className="submit-title">
            <input
              id="title"
              name="title"
              type="text"
              value={titleInput}
              placeholder="Title"
              minLength="5"
              maxLength="300"
              onChange={(e) => setTitleInput(e.target.value)}
              disabled={mode === "edit" && true}
            />
          </fieldset>
          <fieldset className="submit-text">
            <textarea
              name="text"
              id="text"
              placeholder="Text"
              value={textInput}
              minLength="10"
              maxLength="5000"
              onChange={(e) => setTextInput(e.target.value)}
              onFocus={(e) => e.preventDefault()}
            />
            <div>
              <label htmlFor="image-upload" style={labelImageStyles} />
              <input
                type="file"
                id="image-upload"
                name="image-upload"
                accept="image/*"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
          </fieldset>
          {error && <Error className="submit-page error" error={error} />}
          <button type="submit">{capitalize(mode)}</button>
        </>
      )}
    </form>
  );
};

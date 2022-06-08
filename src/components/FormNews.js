import { useContext, useState } from "react";
import { Error } from "./Error";
import { capitalize } from "../utils/capitalizeString";
import "./FormNews.css";
import { AuthContext } from "../context/AuthContext";
import { post } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const FormNews = ({
  mode,
  categoryData,
  categoryLoading,
  categoryError,
}) => {
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ name: "" });
  const [image, setImage] = useState();
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnSubmitPost = async (e) => {
    e.preventDefault();
    setError("");
    const news = new FormData(e.target);
    news.append("title", titleInput);
    news.append("introduction", textInput.slice(0, 50) + "...");
    if (image) news.append("image", image);

    try {
      const response = await post(
        `${process.env.REACT_APP_BACKEND}/news`,
        news,
        token
      );
      navigate(`/news/${response.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="submit-page" onSubmit={handleOnSubmitPost}>
      {categoryError ? (
        <Error className="submit-page error" error={categoryError} />
      ) : (
        !categoryLoading && (
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
              {categoryData.map((category) => (
                <option key={category.id} value={category.name}>
                  {capitalize(category.name)}
                </option>
              ))}
            </select>
          </fieldset>
        )
      )}
      <fieldset className="submit-title">
        <span
          role="textbox"
          value={titleInput}
          onInput={(e) => setTitleInput(e.target.textContent)}
          contentEditable
        />
      </fieldset>
      <fieldset className="submit-text">
        <textarea
          name="text"
          id="text"
          placeholder="Text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onFocus={(e) => e.preventDefault()}
        />
        <div>
          <label
            htmlFor="image-upload"
            style={
              image && {
                background: `url(${URL.createObjectURL(
                  image
                )}) 0px center / contain no-repeat `,
              }
            }
          />
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </fieldset>
      {error && <Error className="submit-page error" error={error} />}
      {mode === "edit" ? (
        <button type="submit">Edit</button>
      ) : (
        <button type="submit">Post</button>
      )}
    </form>
  );
};

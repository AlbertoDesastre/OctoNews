import "./FormNews.css";

export const FormNews = () => {
  return (
    <form className="submit-page">
      <fieldset className="submit-category">
        <select name="categorySelect" id="categorySelect">
          <option>Choose a category</option>
          <option>Cultura</option>
        </select>
      </fieldset>
      <fieldset className="submit-title">
        <span type="text" role="textbox" contentEditable></span>
      </fieldset>
      <fieldset className="submit-text">
        <div>
          <button>Add Image</button>
        </div>
        <textarea name="text" id="text" placeholder="Text"></textarea>
      </fieldset>
      <button type="submit">Post</button>
    </form>
  );
};

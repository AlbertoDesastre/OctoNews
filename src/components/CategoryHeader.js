import { capitalize } from "../utils/capitalizeString";
import { getStylesForCategory } from "../utils/getStylesForCategory";
import "./CategoryHeader.css";

export const CategoryHeader = ({ categoryName }) => {
  const [color, img, background, description] =
    getStylesForCategory(categoryName);

  return (
    <section className="category-page-header">
      <header className="category-page-header">
        <img src={`/categoryIcons/${img}`} alt={`${categoryName} header`} />
      </header>
      <article
        style={{ borderTop: `4px solid ${color}` }}
        className="category-page"
      >
        <img
          style={{ border: `3px solid ${color}` }}
          src={`/categoryIcons/${img}`}
          alt={`${categoryName}`}
        />
        <h2>{capitalize(categoryName)}</h2>
        <p>{description}</p>
      </article>
    </section>
  );
};

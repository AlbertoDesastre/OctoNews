import { capitalize } from "../utils/capitalizeString";
import "./CategoryHeader.css";
import { Error } from "./Error";
import { Loading } from "./Loading";

export const CategoryHeader = ({
  category,
  categoryIsLoading,
  categoryError,
}) => {
  return (
    <section className="category-page-header">
      {categoryIsLoading ? (
        <Loading className="home-page loading carousel" />
      ) : categoryError ? (
        <Error className="category-page error" error={categoryError} />
      ) : (
        <>
          <header className="category-page-header">
            {category.background_image && (
              <img
                src={`${process.env.REACT_APP_BACKEND}/uploads/categories/background/${category.background_image}`}
                alt={`${category.name} header`}
              />
            )}
          </header>
          <article
            style={{ borderTop: `4px solid ${category.color}` }}
            className="category-page"
          >
            {category.icon_image && (
              <img
                style={{ border: `3px solid ${category.color}` }}
                src={`${process.env.REACT_APP_BACKEND}/uploads/categories/icons/${category.icon_image}`}
                alt={`${category.name}`}
              />
            )}
            <h2>{capitalize(category.name)}</h2>
            <p>{category.description}</p>
          </article>
        </>
      )}
    </section>
  );
};

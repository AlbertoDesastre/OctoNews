import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/capitalizeString";
import "./Carousel.css";
import { Error } from "./Error";
import { Loading } from "./Loading";

export const CarouselList = ({
  className,
  categories,
  categoryIsLoading,
  categoryError,
}) => {
  const navigate = useNavigate();

  return (
    <section className={className}>
      {categoryIsLoading ? (
        <Loading className="home-page loading carousel" />
      ) : categoryError ? (
        <Error className="home-page error" error={categoryError} />
      ) : (
        <ul>
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="categories-list"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CarouselItems
                  categoryName={category.name}
                  categoryColor={category.color}
                  categoryIcon={category.icon_image}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const CarouselItems = ({ categoryName, categoryColor, categoryIcon }) => {
  return (
    <article className="category-items">
      <p style={{ backgroundColor: categoryColor }}>
        {capitalize(categoryName)}
      </p>
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/categories/icons/${categoryIcon}`}
        alt={`category ${categoryName}`}
      />
    </article>
  );
};

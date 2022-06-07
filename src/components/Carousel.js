import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/capitalizeString";
import "./Carousel.css";
import { Error } from "./Error";
import { Loading } from "./Loading";

export const CarouselList = ({
  categories,
  categoryIsLoading,
  categoryError,
}) => {
  const navigate = useNavigate();

  return (
    <section className="carousel">
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
    <article className="carousel-items">
      <p style={{ backgroundColor: categoryColor }}>
        {capitalize(categoryName)}
      </p>
      <img
        src={`/categoryIcons/${categoryIcon}`}
        alt={`category ${categoryName}`}
      />
    </article>
  );
};

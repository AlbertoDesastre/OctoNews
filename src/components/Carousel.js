import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/capitalizeString";
import { getStylesForCategory } from "../utils/getStylesForCategory";
import "./Carousel.css";

export const CarouselList = ({
  categories,
  categoryIsLoading,
  categoryError,
}) => {
  const navigate = useNavigate();

  return (
    <section className="carousel">
      {categoryIsLoading ? (
        <img
          className="home-page loading carousel"
          src="/three-dots.svg"
          alt="loading"
        />
      ) : (
        <ul>
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="categories-list"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CarouselItems categoryName={category.name} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const CarouselItems = ({ categoryName }) => {
  const [color, img] = getStylesForCategory(categoryName);

  return (
    <article className="carousel-items">
      <p style={{ backgroundColor: color }}>{capitalize(categoryName)}</p>
      <img src={`/categoryIcons/${img}`} alt={`category ${categoryName}`} />
    </article>
  );
};

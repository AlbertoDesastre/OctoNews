import { capitalize } from "../utils/capitalizeString";
import { getStylesForCategory } from "../utils/getStylesForCategory";
import "./Carousel.css";

export const CarouselList = ({ categories }) => {
  return (
    <section className="carousel">
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id} className="categories-list">
              <CarouselItems categoryName={category.name} />
            </li>
          );
        })}
      </ul>
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

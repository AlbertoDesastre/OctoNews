import "./Carousel.css";

export const CarouselList = () => {
  return (
    <section className="carousel">
      <ul>
        <li>
          <CarouselItems />
        </li>
        <li>
          <CarouselItems />
        </li>
        <li>
          <CarouselItems />
        </li>
      </ul>
    </section>
  );
};

const CarouselItems = () => {
  return (
    <article className="carousel-items">
      <p>category</p>
      <img src="/favicon.ico" alt="img category" />
    </article>
  );
};

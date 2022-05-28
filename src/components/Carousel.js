import "./Carousel.css";

export const CarouselList = () => {
  return (
    <section className="carousel">
      <ul>
        <CarouselItems />
        <CarouselItems />
        <CarouselItems />
      </ul>
    </section>
  );
};

const CarouselItems = () => {
  return (
    <li className="carousel-items">
      <p>category</p>
      <img src="/favicon.ico" alt="img category" />
    </li>
  );
};

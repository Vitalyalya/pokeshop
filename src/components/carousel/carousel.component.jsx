const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://cdn.shopify.com/s/files/1/0349/4379/5332/collections/Pokemon_banner_Toyworld.png?v=1646973605"
            className="d-block w-100"
            alt="banner"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn-cardmavin.mavin.io/wp-content/uploads/2018/11/pokemon-base-set-1200x200.jpg"
            className="d-block w-100"
            alt="banner"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn-cardmavin.mavin.io/wp-content/uploads/2018/11/pokemon-dp-mysterious-treasures-set-1200x200.jpg"
            className="d-block w-100"
            alt="banner"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

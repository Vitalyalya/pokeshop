import "./search-card.styles.css";
import { Link } from "react-router-dom";

const SearchCard = ({ pokemon }) => {
  const { name, id, type, price, discountPrice } = pokemon;

  return (
    <Link className="search-card-wrapper" to="/">
      <picture className="search-card-img">
        <img
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
        />
      </picture>
      <div className="pokemon-info">
        <p className="search-card-name">{name}</p>
        <p className="types-container">
          {typeof type === "object" ? (
            type.map((slot) => (
              <span key={slot} className="badge bg-info text-dark flex-grow-1 ">
                {slot.toUpperCase()}
              </span>
            ))
          ) : (
            <span className="badge bg-info text-dark flex-grow-1">
              {type.toUpperCase()}
            </span>
          )}
        </p>
      </div>
      <div>
        {pokemon.discountPrice ? (
          <div>
            <p>
              <s>
                {price} 円
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  -20%
                  <span className="visually-hidden">Discount amount</span>
                </span>
              </s>
            </p>
            <h6 className="mb-0 ">{discountPrice} 円</h6>
          </div>
        ) : (
          <h6 className="mb-0 ">{price} 円</h6>
        )}
      </div>
    </Link>
  );
};

export default SearchCard;

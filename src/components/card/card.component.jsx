// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Button from "../button/button.component";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const PokeCard = ({ pokemon }) => {
  const { name, id, type, evolution, price, legendary, discountPrice } =
    pokemon;

  const { addItemToCart } = useContext(CartContext);

  let leg = "";

  legendary
    ? (leg = "border border-4 bg-warning")
    : (leg = "border border-4 bg-light");

  const addPokemonToCart = () => {
    // console.log(pokemon);
    addItemToCart(pokemon);
  };

  // console.log(pokemon);

  return (
    <Card className={leg} style={{ width: "15rem", margin: "0 auto" }}>
      <div className="d-flex gap-2 ">
        {typeof type === "object" ? (
          type.map((slot) => (
            <span key={slot} className="badge bg-info text-dark flex-grow-1">
              {slot.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="badge bg-info text-dark flex-grow-1">
            {type.toUpperCase()}
          </span>
        )}
      </div>
      <Card.Img
        className="padding-top-0 mx-auto img-fluid"
        style={{ width: "10rem" }}
        variant="top"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
      />
      <Card.Body>
        <Card.Title className="text-center pb-2">
          {name.toUpperCase()}
        </Card.Title>
        <p className="text-center">Evolution: {evolution}</p>
        <div className="d-flex align-items-center justify-content-center gap-5">
          {pokemon.new ? (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              NEW
              <span className="visually-hidden">NEW</span>
            </span>
          ) : null}
          {pokemon.discountPrice ? (
            <div>
              <h5 className="text-secondary ">
                <s>
                  {price} 円
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    -20%
                    <span className="visually-hidden">Discount amount</span>
                  </span>
                </s>
              </h5>
              <h4 className="mb-0 ">{discountPrice} 円</h4>
            </div>
          ) : (
            <h4 className="mb-0 ">{price} 円</h4>
          )}
          <Button onClick={addPokemonToCart}> Buy </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokeCard;

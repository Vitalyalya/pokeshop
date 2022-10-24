// import { Link } from "react-router-dom";
import Button from "../button/button.component";
import { useContext } from "react";

import { PokeContext } from "../../context/pokemon.context";

const Dropdown = ({ name, drops }) => {
  let dropsArr = drops.split(",");

  const { setFilterSettings } = useContext(PokeContext);

  // const allClickHandler = () => {};

  const clickHandler = (drop) => {
    setFilterSettings(drop.trim().toLowerCase());
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {name}
      </button>
      <ul className="dropdown-menu">
        <Button className="dropdown-item" onClick={() => clickHandler("")}>
          All types
        </Button>
        <hr></hr>
        {dropsArr.map((drop) => (
          <li key={drop}>
            <Button
              className="dropdown-item"
              onClick={() => clickHandler(drop)}
            >
              {drop}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

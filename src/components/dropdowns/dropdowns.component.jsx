import Dropdown from "../../components/dropdown/dropdown.component";

import { useContext } from "react";
import { PokeContext } from "../../context/pokemon.context";

const DropdownPanel = () => {
  const { setFilterSettings } = useContext(PokeContext);

  const clickHandler = (drop) => {
    setFilterSettings(drop.trim().toLowerCase());
  };
  return (
    <section className="dropdown-section">
      <Dropdown
        name="Evolutions"
        drops={"Evolution: 1,Evolution: 2,Evolution: 3"}
      />
      <Dropdown
        name="Types"
        drops={
          "Bug, Dragon, Electric,Fighting,Fire,Flying,Ghost,Grass,Ground,Normal,Poison,Psychic,Rock,Water"
        }
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => clickHandler("new:true")}
      >
        New
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => clickHandler("discountPrice:null")}
      >
        Discounts
      </button>
    </section>
  );
};

export default DropdownPanel;

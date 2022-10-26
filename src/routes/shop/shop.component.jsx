import { Routes, Route } from "react-router-dom";

import PokemonFilters from "../pokemon-filters/pokemon-filters.component";
import ProductCard from "../product-card/product-card.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<PokemonFilters />} />
      <Route path=":name" element={<ProductCard />} />
    </Routes>
  );
};

export default Shop;

import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import LogInForm from "./components/login-form/login-form";
import SignUp from "./routes/sign-up/sign-up.component";
import Checkout from "./routes/checkout/checkout.component";
import ProfilePage from "./routes/profile/profile.component";
import Search from "./routes/search/search.component";
import PokemonFilters from "./routes/pokemon-filters/pokemon-filters.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="login/" element={<LogInForm />}></Route>
        <Route path="sign-up/" element={<SignUp />}></Route>
        <Route path="checkout/" element={<Checkout />}></Route>
        <Route path="profile/" element={<ProfilePage />}></Route>
        <Route path="pokemon/" element={<PokemonFilters />}></Route>
        <Route path="search/" element={<Search />}></Route>
        <Route path="pokemon/*" element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

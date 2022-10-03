import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import SignUp from "./routes/sign-up/sign-up.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="login/" element={<Login />}></Route>
        <Route path="sign-up/" element={<SignUp />}></Route>
        <Route path="checkout/" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
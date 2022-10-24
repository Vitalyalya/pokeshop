import { Outlet, Link } from "react-router-dom";
import { useState, useContext, Fragment } from "react";
import { signOutUser } from "./../../components/utils/firebase.util";

import SearchBox from "../../components/search-box/searchbox.component";
import SearchCard from "../../components/search-card/search-card.component";
import Button from "../../components/button/button.component";

import { UserContext } from "./../../context/user.context";

import { PokeContext } from "../../context/pokemon.context";

import "./navigation.styles.css";

const Navigation = () => {
  const [searchField, setSearchField] = useState("");

  const pokemon = useContext(PokeContext);

  const { currentUser } = useContext(UserContext);

  const filteredPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.toLocaleLowerCase().includes(searchField);
  });

  const onSearchChange = (event) => {
    event.preventDefault();

    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onBlur = (event) => {
    event.preventDefault();
    setSearchField("");
  };

  const userFromStorage = localStorage.getItem("user");

  return (
    <Fragment>
      <div className="nav-container container">
        <Link className="logo-container" to="/">
          <img alt="logo" src="https://via.placeholder.com/160x80" />
        </Link>
        <div className="searchcard-container">
          <SearchBox
            className="search-box"
            onChangeHandler={onSearchChange}
            placeholder="Search pokemon"
            onBlurHandler={onBlur}
          />
          <div className="search-card-container">
            {searchField.length > 1
              ? filteredPokemon
                  .filter((item, idx) => idx < 4)
                  .map((pokemon) => (
                    <div key={pokemon.id} className="position-relative">
                      <SearchCard pokemon={pokemon} />
                    </div>
                  ))
              : null}
          </div>
        </div>
        <div className="nav-links">
          <ul className="mb-0">
            <li>
              <Link className="nav-link" to="/profile">
                <ion-icon class="nav-icon" name="person-outline"></ion-icon>
                Profile
              </Link>
            </li>
            {userFromStorage || currentUser ? (
              <Link className="nav-link" to="/">
                Hello, {userFromStorage}
              </Link>
            ) : null}
            {!userFromStorage && !currentUser ? (
              <Fragment>
                <Link to="/login">
                  <Button buttonType="light">Log In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </Fragment>
            ) : (
              <Link className="nav-link" onClick={signOutUser}>
                <Button>Sign out</Button>
              </Link>
            )}
            <li>
              <Link className="nav-link" to="/checkout">
                <ion-icon class="nav-icon" name="cart-outline"></ion-icon>Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

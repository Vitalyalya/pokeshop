import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import SearchBox from "../../components/search-box/searchbox.component";
import SearchCard from "../../components/search-card/search-card.component";

import { useState, useContext } from "react";

import { PokeContext } from "../../context/pokemon.context";

import "./navigation.styles.css";

const Navigation = () => {
  const [searchField, setSearchField] = useState("");

  const pokemon = useContext(PokeContext);

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
            <li>
              <Link className="nav-link" to="/blog">
                <ion-icon
                  class="nav-icon"
                  name="document-text-outline"
                ></ion-icon>
                Blog
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/contacts">
                <ion-icon class="nav-icon" name="call-outline"></ion-icon>
                Contacts
              </Link>
            </li>
            <Link type="submit" className="btn btn-info" to="/login">
              Log In
            </Link>
            <Link type="submit" className="btn btn-primary" to="/sign-up">
              Sign Up
            </Link>
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
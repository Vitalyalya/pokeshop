import { Outlet, Link } from "react-router-dom";
import { useState, useContext, Fragment } from "react";
import { signOutUser } from "./../../components/utils/firebase.util";
import { useNavigate } from "react-router-dom";

import SearchBox from "../../components/search-box/searchbox.component";
import SearchCard from "../../components/search-card/search-card.component";
import Button from "../../components/button/button.component";

import { UserContext } from "./../../context/user.context";

import { PokeContext } from "../../context/pokemon.context";

import "./navigation.styles.css";

const Navigation = () => {
  const [searchField, setSearchField] = useState("");

  const { pokemon } = useContext(PokeContext);

  const { currentUser } = useContext(UserContext);

  const filteredPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.toLocaleLowerCase().includes(searchField);
  });

  const navigate = useNavigate();

  const onSearchChange = (event) => {
    event.preventDefault();

    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onBlur = () => {
    // setTimeout(() => {
    setSearchField("");
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchField("");
    navigate("/search", { state: { filteredPokemon, searchField } });
  };

  const userFromStorage = localStorage.getItem("user");

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg container">
        <Link className="logo-container" to="/">
          <img alt="logo" src="https://via.placeholder.com/160x80" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <ion-icon className="collapse-icon" name="menu-outline"></ion-icon>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              <div className="searchcard-container">
                <SearchBox
                  className="search-box"
                  onChangeHandler={onSearchChange}
                  placeholder="Search pokemon"
                  // onBlurHandler={onBlur}
                  onSubmitHandler={submitHandler}
                  value={searchField}
                />
                <div className="search-card-container">
                  {searchField.length > 1
                    ? filteredPokemon
                        .filter((_, idx) => idx < 4)
                        .map((pokemon) => (
                          <div key={pokemon.id} className="position-relative">
                            <Link
                              onClick={onBlur}
                              className="search-card-wrapper"
                              to={`/pokemon/${pokemon.name}`}
                            >
                              <SearchCard pokemon={pokemon} />
                            </Link>
                          </div>
                        ))
                    : null}
                </div>
              </div>
            </li>
            <li
              // data-toggle="collapse"

              className="nav-item"
            >
              <Link className="nav-link" to="/pokemon">
                <ion-icon className="nav-icon" name="reader-outline"></ion-icon>
                <p
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                >
                  Pokemon
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <ion-icon className="nav-icon" name="person-outline"></ion-icon>
                <p
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                >
                  Profile
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                <ion-icon className="nav-icon" name="cart-outline"></ion-icon>
                <p
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                >
                  Cart
                </p>
              </Link>
            </li>
            <li className="nav-item">
              {userFromStorage || currentUser ? (
                <Fragment>
                  <div className="buttons-container">
                    <div className="nav-link">
                      <ion-icon
                        className="nav-icon"
                        name="checkmark-outline"
                      ></ion-icon>
                      {userFromStorage}
                    </div>
                  </div>
                </Fragment>
              ) : null}

              {!userFromStorage && !currentUser ? (
                <Fragment>
                  <div className="buttons-container">
                    <div className="nav-item">
                      <Link to="/login">
                        <Button
                          data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent"
                          buttonType="light"
                        >
                          Log In
                        </Button>
                      </Link>
                    </div>

                    <Link to="/sign-up">
                      <Button
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </Fragment>
              ) : (
                <div className="nav-item">
                  <Link className="nav-link" onClick={signOutUser}>
                    <Button
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                    >
                      Sign out
                    </Button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

import { Outlet, Link } from "react-router-dom";
import { useState, useContext, Fragment, useEffect } from "react";
import { signOutUser } from "./../../components/utils/firebase.util";
import { useNavigate } from "react-router-dom";

import SearchBox from "../../components/search-box/searchbox.component";
import SearchCard from "../../components/search-card/search-card.component";
import Button from "../../components/button/button.component";

import { UserContext } from "./../../context/user.context";

import { CartContext } from "../../context/cart.context";

import { PokeContext } from "../../context/pokemon.context";

import "./navigation.styles.css";

const Navigation = () => {
  const [searchField, setSearchField] = useState("");

  const pArray = document.getElementsByTagName("p");

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }
  const { pokemon } = useContext(PokeContext);

  const { currentUser } = useContext(UserContext);

  const { setCartItems, setCartTotal } = useContext(CartContext);

  const filteredPokemon = Object.values(pokemon).filter((pokemon) => {
    return pokemon.name.toLocaleLowerCase().includes(searchField);
  });

  const navigate = useNavigate();

  const onSearchChange = (event) => {
    event.preventDefault();

    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onBlur = () => {
    setSearchField("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchField("");
    navigate("/search", { state: { filteredPokemon, searchField } });
  };

  const signOutUserhandler = () => {
    signOutUser();
    navigate("/");
    localStorage.clear();
    setCartItems([]);
    setCartTotal(0);
  };

  const onClickHandler = () => {
    Array.from(pArray).forEach((pTag) => {
      pTag.setAttribute("data-bs-toggle", "collapse");
      pTag.setAttribute("data-bs-target", "#navbarSupportedContent");
    });
  };

  const pHandler = () => {
    Array.from(pArray).forEach((pTag) => {
      pTag.setAttribute("data-bs-toggle", "");
      pTag.setAttribute("data-bs-target", "");
    });
  };

  let winSize = useWindowSize();

  const userFromStorage = localStorage.getItem("user");

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg container">
        <Link className="logo-container" to="/">
          <img
            alt="logo"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/87044f58-c765-43c5-bc51-8613e3ac7ab1/ddew4m7-c69a2c41-518f-48ca-ba35-8ab1895464e0.png/v1/fill/w_1385,h_577,strp/logo_pokemon_recto__editable_con_photoshop_by_marisadiecisiete_ddew4m7-pre.png"
          />
        </Link>
        {winSize.width >= 581 ? (
          <div className="searchcard-container">
            <SearchBox
              className="search-box"
              onChangeHandler={onSearchChange}
              placeholder="Search pokemon"
              onSubmitHandler={submitHandler}
              value={searchField}
            />
            <div className="search-card-container">
              {searchField.length > 1
                ? Object.values(filteredPokemon)
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
        ) : null}

        <button
          className="navbar-toggler"
          id="toggler"
          type="button"
          data-toggle="collapse"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={onClickHandler}
        >
          <span className="navbar-toggler-icon">
            <ion-icon class="collapse-icon" name="menu-outline"></ion-icon>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              {winSize.width < 581 ? (
                <div className="searchcard-container">
                  <SearchBox
                    className="search-box"
                    onChangeHandler={onSearchChange}
                    placeholder="Search pokemon"
                    onSubmitHandler={submitHandler}
                    value={searchField}
                  />
                  <div className="search-card-container">
                    {searchField.length > 1
                      ? Object.values(filteredPokemon)
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
              ) : null}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pokemon">
                <ion-icon className="nav-icon" name="reader-outline"></ion-icon>
                <p onClick={pHandler}>Pokemon</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                <ion-icon className="nav-icon" name="cart-outline"></ion-icon>
                <p onClick={pHandler}>Cart</p>
              </Link>
            </li>
            <li className="nav-item">
              {userFromStorage || currentUser ? (
                <Fragment>
                  <div className="buttons-container">
                    <div className="nav-link">
                      <Link className="nav-link" to="/profile">
                        <ion-icon
                          className="nav-icon"
                          name="person-outline"
                        ></ion-icon>{" "}
                        <p onClick={pHandler}>{userFromStorage}</p>
                      </Link>
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
                  <Button onClick={signOutUserhandler}>Sign out</Button>
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

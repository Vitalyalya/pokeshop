import "./searchbox.styles.css";

const SearchBox = ({
  className,
  placeholder,
  onChangeHandler,
  onBlurHandler,
}) => (
  <form>
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  </form>
);

export default SearchBox;

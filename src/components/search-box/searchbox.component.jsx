import "./searchbox.styles.css";

const SearchBox = ({
  className,
  placeholder,
  onChangeHandler,
  // onBlurHandler,
  onSubmitHandler,
  value,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
        // onBlur={onBlurHandler}
        value={value}
      />
    </form>
  );
};

export default SearchBox;

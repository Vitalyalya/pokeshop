import "./searchbox.styles.css";

const SearchBox = ({
  className,
  placeholder,
  onChangeHandler,
  onSubmitHandler,
  value,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <input
        className={className}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      />
    </form>
  );
};

export default SearchBox;

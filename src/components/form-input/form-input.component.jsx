const FormInput = ({ label, ...otherProps }) => {
  return (
    <>
      <label className="input">{label}</label>
      <input className="input__field" {...otherProps} />
    </>
  );
};

export default FormInput;

import { Fragment } from "react";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Fragment>
      <label className="input">{label}</label>
      <input className="input__field" {...otherProps} />
    </Fragment>
  );
};

export default FormInput;

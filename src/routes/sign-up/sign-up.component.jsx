import Button from "../../components/button/button.component";

const SignUp = () => {
  return (
    <form className="container-sign-in">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          placeholder="example@example.mail"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <Button type="submit" buttonType="long">
        Sign Up
      </Button>
      <hr></hr>
      <h5 className="text-center">OR</h5>
      <Button type="submit" buttonType="long">
        Sign Up With Google
      </Button>
    </form>
  );
};

export default SignUp;

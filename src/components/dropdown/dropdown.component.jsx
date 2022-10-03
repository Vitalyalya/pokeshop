import { Link } from "react-router-dom";

const Dropdown = ({ name, drops }) => {
  let dropsArr = drops.split(",");

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {name}
      </button>
      <ul className="dropdown-menu">
        <Link className="dropdown-item" href="#">
          All types
        </Link>
        <hr></hr>
        {dropsArr.map((drop) => (
          <li key={drop}>
            <Link className="dropdown-item" href="#">
              {drop}
            </Link>
          </li>
        ))}
        {/* <li>
          <Link className="dropdown-item" href="#">
            Action
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            Another action
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            Something else here
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Dropdown;

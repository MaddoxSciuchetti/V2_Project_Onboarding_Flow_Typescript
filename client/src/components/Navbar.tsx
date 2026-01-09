import { NavLink } from "react-router-dom";
import "./Navbar.css";
import bsb from "../assets/bsb.png";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/onboarding">
            <strong>Onboarding</strong>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img className="image-navbar" src={bsb} alt="not shown "></img>
          </NavLink>
        </li>
        <li>
          <NavLink to="/offboarding">
            <strong>Offboarding</strong>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

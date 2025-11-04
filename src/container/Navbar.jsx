import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>BSMEB</h3>
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/student">Student</NavLink>
        <NavLink to="/marksheet">Marksheet</NavLink>
        <NavLink to="/certificate">Marksheet-Faq</NavLink>
        <NavLink to="/new-marksheet">New-Marksheet</NavLink>
        <NavLink to="/old-certificate">Old-Certificate</NavLink>
        <NavLink to="/old-certificate-2017">Old-Certificate-2018-22</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

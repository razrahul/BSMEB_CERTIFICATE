// src/containers/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>BSMEB</h3>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/student">Student</Link>
        <Link to="/marksheet">Marksheet</Link>
        <Link to="/certificate">Marksheet-Faq</Link>
        <Link to="/new-marksheet">New-Marksheet</Link>
        <Link to="/old-certificate">Old-Certificate</Link>
        <Link to="/old-certificate-2017">Old-Certificate-2017</Link>
      </nav>
    </div>
  );
};

export default Navbar;

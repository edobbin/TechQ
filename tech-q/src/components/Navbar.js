// Navbar.js
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../logoTechQ.PNG';

const Navbar = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navbar">
      {/* Logo and Website Name */}
      <div className="logo-container">
        <span className="website-name">Tech</span>
        <img src={logo} alt="TechQ Logo" className="logo" />
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        {/* Add other navigation items */}
        <li className="nav-item">
          <NavLink to="/questions" className="nav-link" activeClassName="active">
            Ask a Question
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/posted" className="nav-link" activeClassName="active">
            My Questions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link" activeClassName="active">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


// // Navbar.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../logoTechQ.PNG'



// const Navbar = () => {
//   const location = useLocation()
//   if(location.pathname === '/' || location.pathname === '/signup') {
//     return null
//   }

//   return (
//     <nav className="navbar">
//       <div className="logo-container">
//       <span className="website-name">Tech</span>
//       <img src={logo} alt="TechQ Logo" className="logo"/>
        
//       </div>
//       <ul className="nav-list">
//         <li className="nav-item">
//           <Link to="/home" className="nav-link" activeClassName="active">
//             Home
//           </Link>
//         </li>
//         {/* <li className="nav-item">
//           <Link to="/about" className="nav-link">
//             About
//           </Link>
//         </li> */}
//         <li className="nav-item">
//           <Link to="/questions" className="nav-link" activeClassName="active">
//             Ask a Question
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/posted" className="nav-link" activeClassName="active">
//             My Questions
//           </Link>
//         </li>
//         {/* <li className="nav-item">
//           <Link to="/contact" className="nav-link">
//             Contact
//           </Link>
//         </li> */}
//         <li className="nav-item">
//           <Link to="/profile" className="nav-link" activeClassName="active">
//             Profile
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import './Menu.css';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <ul>
        <li className={location.pathname === '/no-library-form' ? 'active' : '' }>
          <Link to="/no-library-form">No Library Form</Link>
        </li>
        <li className={location.pathname === '/no-library-form-new' ? 'active' : '' }>
          <Link to="/no-library-form-new">No Library Form [NEW]</Link>
        </li>
        <li className={location.pathname === '/controlled-form' ? 'active' : '' }>
          <Link to="/controlled-form">Controlled Form</Link>
        </li>
        <li className={location.pathname === '/uncontrolled-form' ? 'active' : '' }>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/" className="link">主页</Link>
        </li>
        <li>
          <Link to="/excel2List" className="link">条条</Link>
        </li>
      </ul>
    </nav>
  );
}

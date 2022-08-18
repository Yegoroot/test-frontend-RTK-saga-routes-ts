import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.module.css'

export const Navbar:FC = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink
          to="/history"
          className={(isActive) => `nav-link${!isActive ? ' unselected' : ''}`}
        >
          History
        </NavLink>
      </li>
    </ul>
  </nav>
)

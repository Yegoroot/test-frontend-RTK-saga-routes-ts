import { FC } from 'react'
import {
  Link, LinkProps, useResolvedPath, useMatch
} from 'react-router-dom'

import './Navbar.module.css'

function CustomLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <div>
      <Link
        style={{
          textDecoration: match ? 'underline' : 'none',
          color: match ? '#3685c6' : 'inherit'
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>

    </div>
  )
}

export const Navbar:FC = () => (
  <nav>
    <ul>
      <li>
        <CustomLink to="/">Home</CustomLink>
      </li>
      <li>
        <CustomLink to="/history">
          History
        </CustomLink>
      </li>
    </ul>
  </nav>
)

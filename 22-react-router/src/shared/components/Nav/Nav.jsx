import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';

export default function Nav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => `${isActive ? classes.active : undefined}`}
              end // 'end' ensures that the link is only active when the path is exactly "/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about"
              className={({isActive}) => `${isActive ? classes.active : undefined}`}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({isActive}) => `${isActive ? classes.active : undefined}`}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

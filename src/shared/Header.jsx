import classes from './Header.module.css';
import { NavLink } from 'react-router';

export default function Header() {
    return (
        <div>
            <nav>
                <NavLink to={'/'} className={({isActive}) => isActive ? classes.active : classes.inactive}>Home</NavLink>
                <NavLink to={'/about'} className={({isActive}) => isActive ? classes.active : classes.inactive}>About</NavLink>
            </nav>
            <div className={classes.header}>
                <img src="./src/assets/react.svg"></img>
                <h1>My ToDos</h1>
            </div>
        </div>
    );
}

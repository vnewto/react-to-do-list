import classes from './App.module.css';

export default function Header() {
    return (
        <div className={classes.header}>
            <img src="./src/assets/react.svg"></img>
            <h1>My ToDos</h1>
        </div>
    );
}

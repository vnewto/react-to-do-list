import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';

//Create todo form component
export default function TodoForm(props) {
    const todoTitleInput = useRef('');

    // create a workingTodoTitle state variable with the accompanying state update function
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    function handleAddTodo(event) {
        // prevent the page from refreshing
        event.preventDefault();

        const newTodo = {
            title: workingTodoTitle,
            isCompleted: false,
        };

        // invoke onAddTodo function, passing in workingTitle as parameter
        props.onAddTodo(newTodo);

        //reset input to empty string
        setWorkingTodoTitle('');

        //refocus on form input so user doesn't have to click on it again
        todoTitleInput.current.focus();
    }

    return (
        // form to add a new todo item
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                type="text"
                value={workingTodoTitle}
                ref={todoTitleInput}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
                elementId="todoTitle"
                labelText="toDo"
            ></TextInputWithLabel>
            <button type="submit" disabled={workingTodoTitle.trim === ''}>
                {props.isSaving ? 'Saving...' : 'Add Todo'}
            </button>
        </form>
    );
}

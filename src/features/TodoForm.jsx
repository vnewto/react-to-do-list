import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styled from 'styled-components';

const StyledForm = styled.form`
    padding-top: 2em;
    border-top: dashed 2px #4a306d;
`;

const StyledButton = styled.button`
    opacity: ${(props) => props.disabled && 0.5};
    font-style: ${(props) => props.disabled && 'italic'};
    &:hover {
        background-color: ${(props) => props.disabled && '#a167a5'};
    }
`;

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
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel
                type="text"
                value={workingTodoTitle}
                ref={todoTitleInput}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
                elementId="todoTitle"
                labelText="toDo"
            ></TextInputWithLabel>
            <StyledButton
                type="submit"
                disabled={workingTodoTitle.trim() === ''}
            >
                {props.isSaving ? 'Saving...' : 'Add Todo'}
            </StyledButton>
        </StyledForm>
    );
}

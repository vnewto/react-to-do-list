import { useRef, useState } from 'react'

//Create todo form component
export default function TodoForm(props) {

    const todoTitleInput = useRef("")

    // create a workingTodoTitle state variable with the accompanying state update function
    const [workingTodoTitle, setWorkingTodoTitle] = useState("")
    
    function handleAddTodo(event) {
        // prevent the page from refreshing
        event.preventDefault() 

        // invoke onAddTodo function, passing in workingTitle as parameter
        props.onAddTodo(workingTodoTitle)

        //reset input to empty string
        setWorkingTodoTitle("")

        //refocus on form input so user doesn't have to click on it again
        todoTitleInput.current.focus()
    }

    return (
        // form to add a new todo item
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input value={workingTodoTitle} type="text" id="todoTitle" name="title" ref={todoTitleInput} onChange={(event) => setWorkingTodoTitle(event.target.value)}></input>
            <button type="submit" disabled={workingTodoTitle.length === 0}>Add Todo</button>
        </form>
    );
}
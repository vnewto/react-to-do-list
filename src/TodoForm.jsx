import { useRef } from 'react'

//Create todo form component
export default function TodoForm(props) {

    const todoTitleInput = useRef("")
    
    function handleAddTodo(event) {
        // prevent the page from refreshing
        event.preventDefault() 
        
        //declare variable for the title of the input
        const title = event.target.title.value

        // invoke onAddTodo function, passing in title as parameter
        props.onAddTodo(title)

        //reset input to empty string
        event.target.title.value=""

        //refocus on form input so user doesn't have to click on it again
        todoTitleInput.current.focus()
    }

    return (
        // form to add a new todo item
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" ref={todoTitleInput}></input>
            <button type="submit">Add Todo</button>
        </form>
    );
}
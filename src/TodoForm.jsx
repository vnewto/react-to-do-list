import { useRef } from 'react'

//Create todo form component
export default function TodoForm(props) {

    const todoTitleInput = useRef(document.querySelector("#todoTitle"))
    
    function handleAddTodo(event) {
        // prevent the page from refreshing
        event.preventDefault() 
        
        const title = event.target.title.value
        props.onAddTodo(title)

        //reset input to empty string
        event.target.title.value=""

        todoTitleInput.current.focus()
    }

    return (
        // form to add a new todo item
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title"></input>
            <button type="submit">Add Todo</button>
        </form>
    );
}
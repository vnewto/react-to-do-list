import {useState} from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem( {todo, onCompleteTodo} ) {
    
    const[isEditing, setIsEditing] = useState(false)
    const[workingTitle, setWorkingTitle] = useState(todo.title)

    // create helper function for when user cancels out of editing
    function handleCancel() {
        // reset working title to todo.title
        setWorkingTitle(todo.title)
        // set isEditing state value to false
        setIsEditing(false)
    }

    // create helper function for when user edits the todo and updates it
    function handleEdit(event) {
        // set working title to the new value that has been entered
        setWorkingTitle(event.target.value)
    }
    
    return (
        // if statement for whether the user is or is not currently editing the todo
        isEditing ? (
            // if true, display an instance of TextInputWithLabel with its props value set to todo.title
            <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                {/* create a cancel button for user to cancel out of editing mode */}
                <button type="button" onClick={handleCancel}>Cancel</button>
            </>
        ) : (
            // If false, display the existing form and its contents. The form will contain the checkbox input and the todo title.
            <li>
                <form>
                    {/* add checkbox to change state to isCompleted for each todo item */}
                    <input 
                        type="checkbox"
                        id={`checkbox${todo.id}`}
                        checked={todo.isCompleted} 
                        onChange={() => onCompleteTodo(todo.id)}>
                    </input>
                    {/* Add an onClick handler to the span that toggles the isEditing state value to true. */}
                    <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                </form>
            </li>
            )
        );
    }

export default TodoListItem
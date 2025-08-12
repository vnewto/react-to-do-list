// import TodoListItem
import TodoListItem from './TodoListItem.jsx'

{/*extract from TodoList.jsx*/}
function TodoList ({todoList}) {

    return (
        <>
            {/* create ternary statement that compares todolist length to 0 */}
            {todoList.length == 0 ? 
                // if no items, display instructions to add todo
                <p>Add a todo above to get started</p> : 
                // if items, display items
                <ul>
                    {todoList.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
                </ul>}
        </>
    );
}

export default TodoList
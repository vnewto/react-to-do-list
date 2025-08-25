// import TodoListItem
import TodoListItem from './TodoListItem.jsx'

{/*extract from TodoList.jsx*/}
function TodoList ({ todoList, onCompleteTodo, onUpdateTodo }) {

    const filteredTodoList = todoList.filter((todo) => todo.isCompleted == false)

    return (
        <>
            {/* create ternary statement that compares todolist length to 0 */}
            {filteredTodoList.length == 0 ? 
                // if no items, display instructions to add todo
                <p>Add a todo above to get started</p> : 
                // if items, display items
                <ul>
                    {filteredTodoList.map(todo => <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo}/>)}
                </ul>}
        </>
    );
}

export default TodoList
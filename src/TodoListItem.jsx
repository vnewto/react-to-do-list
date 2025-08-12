function TodoListItem( {todo, onCompleteTodo} ) {
    return (
        <li>
            <form>
                {/* add checkbox to change state to isCompleted for each todo item */}
                <input type="checkbox" checked={todo.isCompleted} onChange={() => onCompleteTodo(todo.id)}></input>
                {todo.title}
            </form>
        </li>
    );
}

export default TodoListItem
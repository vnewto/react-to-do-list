// import TodoListItem
import TodoListItem from './TodoListItem.jsx'

{/*extract from TodoList.jsx*/}
function TodoList ({todoList}) {
    return (
        <>
            <ul>
                {todoList.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
            </ul>
        </>
    );
}

export default TodoList
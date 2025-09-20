// import TodoListItem
import TodoListItem from './TodoListItem.jsx';

//import css classes
import classes from './TodoList.module.css';

{
    /*extract from TodoList.jsx*/
}
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
    const filteredTodoList = todoList.filter(
        (todo) => todo.isCompleted == false
    );

    return (
        <div>
            {/* Add a statement that conditionally renders the loading message based on isLoading */}
            {isLoading ? (
                <p>Loading your todos...</p>
            ) : // create ternary statement that compares todolist length to 0
            filteredTodoList.length == 0 ? (
                // if no items, display instructions to add todo
                <p>Add a todo above to get started</p>
            ) : (
                // if items, display items
                <ul className={classes.itemList}>
                    {filteredTodoList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            onCompleteTodo={onCompleteTodo}
                            onUpdateTodo={onUpdateTodo}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;

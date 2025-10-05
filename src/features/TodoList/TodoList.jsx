// import TodoListItem
import TodoListItem from './TodoListItem.jsx';

import { useSearchParams, useNavigate } from 'react-router';

import { useState, useEffect } from 'react';

//import css classes
import classes from './TodoList.module.css';

export default function TodoList({
    todoList,
    onCompleteTodo,
    onUpdateTodo,
    isLoading,
}) {
    const filteredTodoList = todoList.filter(
        (todo) => todo.isCompleted == false
    );

    //setup for pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get('page')) || 1
    );
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

    // Create a handler function handlePreviousPage that uses setSearchParams to set page to currentPage - 1 while preventing the value from decreasing below 1
    function handlePreviousPage() {
        if (currentPage > 1) {
            setSearchParams(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setSearchParams(currentPage + 1);
        }
    }

    const navigate = useNavigate();

    //Create a useEffect that examines the currentPage
    useEffect(() => {
        if (totalPages > 0) {
            //If it is not a valid number (eg: "moose"), less than 1, or greater than totalPages, programmatically navigate to "/"
            if (typeof currentPage != 'number') {
                navigate('/');
            } else if (currentPage < 1) {
                navigate('/');
            } else if (currentPage > totalPages) {
                navigate('/');
            }
        }
    }, [currentPage, totalPages, navigate]);

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
                <div>
                    {/* // if items, display items */}
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
                    <div className={classes.paginationControls}>
                        <button
                            className={classes.paginationBtn}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className={classes.paginationBtn}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

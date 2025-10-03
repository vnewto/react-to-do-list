import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

export default function TodosPage({
    addTodo,
    todoState,
    completeTodo,
    updateTodo,
    sortDirection,
    setSortDirection,
    sortField,
    setSortField,
    queryString,
    setQueryString,
}) {
    return (
        <>
            <TodoForm
                onAddTodo={addTodo}
                isSaving={todoState.isSaving}
            ></TodoForm>
            <hr />
            <TodoList
                todoList={todoState.todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                isLoading={todoState.isLoading}
            ></TodoList>
            <hr />
            <TodosViewForm
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                queryString={queryString}
                setQueryString={setQueryString}
            ></TodosViewForm>
            <hr />
        </>
    );
}

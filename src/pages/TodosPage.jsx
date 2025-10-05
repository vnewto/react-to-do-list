import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

export default function TodosPage({
    onAddTodo,
    todoState,
    onCompleteTodo,
    onUpdateTodo,
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
                onAddTodo={onAddTodo}
                isSaving={todoState.isSaving}
            ></TodoForm>
            <hr />
            <TodoList
                todoList={todoState.todoList}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
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

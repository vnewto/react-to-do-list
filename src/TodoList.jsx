
// define todos array
const todos = [
    {id: 1, title: "review resources"},
    {id: 2, title: "take notes"},
    {id: 3, title: "code out app"}
]

{/*extract from TodoList.jsx*/}
function TodoList () {
    return (
        <>
            <ul>
                {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
            </ul>
        </>
    )
}

export default TodoList
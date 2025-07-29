{/* Create todo form component */}
export default function TodoForm() {
    return (
        // form to add a new todo item
        <form>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle"></input>
            <button type="submit">Add Todo</button>
        </form>
    )
}
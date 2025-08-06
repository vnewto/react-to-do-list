import { useState } from 'react'
import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useRef } from 'react'

function App() {

  // create a new state value for a new todo
  const [todoList, setTodoList] = useState([])

  function addTodo(title) {
    const newTodo = {title: title, id: Date.now()}
    setTodoList([...todoList, newTodo])  
  }

  return (
    <div>
      <h1>My ToDos</h1>
      {/* add instance of TodoForm */}
      <TodoForm onAddTodo={addTodo}></TodoForm>
      {/* add instance of TodoList */}
      <TodoList todoList={todoList}></TodoList>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function App() {

  // create a new state value for a new todo
  const [newTodo, setNewTodo] = useState('test')

  return (
    <div>
      <h1>My ToDos</h1>
      {/* add instance of TodoForm */}
      <TodoForm></TodoForm>
      {/* add newTodo here */}
      <p>{newTodo}</p>
      {/* add instance of TodoList */}
      <TodoList></TodoList>
    </div>
  )
}

export default App

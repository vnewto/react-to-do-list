import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function App() {

  return (
    <div>
      <h1>My ToDos</h1>
      {/* add instance of TodoForm */}
      <TodoForm></TodoForm>
      {/* add instance of TodoList */}
      <TodoList></TodoList>
    </div>
  )
}

export default App

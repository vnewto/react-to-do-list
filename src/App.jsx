import { useState } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import { useRef } from 'react'

function App() {

  // create a new state value for a new todo
  const [todoList, setTodoList] = useState([])

  // function for adding a new item to the todo list
  function addTodo(title) {
    const newTodo = {title: title, id: Date.now(), isCompleted: false}
    setTodoList([...todoList, newTodo])  
  }

  // function for checking off a todoList item
  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      // if the id matches a todo item on the list, change isCompleted prop to true
      if (todo.id == id) {
        return {...todo, isCompleted: true}
      }
      else return todo
    });
    // change state to updated list with the checked off item removed
    setTodoList(updatedTodos)
  }

  // function for updating a todo that updates the todo list state when a todo is edited
  function updateTodo(editedTodo) {
    // map through the todos, comparing each todo.id with the updated todo's id
    const updatedTodos = todoList.map((todo) => {
      // if the id matches the id of the edited todo, return a new object that destructures the edited todo
      if (todo.id == editedTodo.id) {
        return {...editedTodo}
      }
      else return todo
    })
    // update the todoList state value with updatedTodos
    setTodoList(updatedTodos)
  }

  return (
    <div>
      <h1>My ToDos</h1>
      {/* add instance of TodoForm */}
      <TodoForm onAddTodo={addTodo}></TodoForm>
      {/* add instance of TodoList */}
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo} 
        onUpdateTodo={updateTodo}>
      </TodoList>
    </div>
  )
}

export default App

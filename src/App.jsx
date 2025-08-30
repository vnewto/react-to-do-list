import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

function App() {
    // create a new state value for a new todo
    const [todoList, setTodoList] = useState([]);

    // Create an isLoading state variable with a defaultValue of false
    const [isLoading, setIsLoading] = useState(false);

    // Create a state variable for errorMessage and default to an empty string
    const [errorMessage, setErrorMessage] = useState('');

    // declare variables that will be used for fetch requests
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;

    //create state variable for conditional rendering of isSaving with AddTodo button
    const [isSaving, setIsSaving] = useState(false);

    //function for handling dismissing a message
    function handleDismiss() {
        // set error message back to empty string
        setErrorMessage('');
    }

    useEffect(() => {
        const fetchTodos = async () => {
            // set options object for the fetch request
            const options = {
                method: 'GET',
                headers: { Authorization: token },
            };
            // update isLoading to true
            setIsLoading(true);
            //set up try/catch/finally block for handling the fetch
            try {
                const resp = await fetch(url, options);
                // show error message if response not ok
                if (!resp.ok) {
                    throw new Error(resp.message);
                }
                // if response is ok, convert promise from json
                const data = await resp.json();
                console.log('data: ', data); //data comes back as an object with key "records" and value of an array
                // map through each record of the record array, make each todo an object with key/value pairs as properties
                const todos = data.records.map((record) => {
                    // if iscompleted doesn't exist, set it to false
                    if (!record.fields.isCompleted) {
                        record.fields.isCompleted = false;
                    }
                    // map properties to a todo object
                    const todo = {
                        id: record.id,
                        createdTime: record.createdTime,
                        title: record.fields.title,
                        isCompleted: record.fields.isCompleted,
                    };
                    console.log(todo);
                    return todo;
                });
                setTodoList([...todos]);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    // function for adding a new item to the todo list
    async function addTodo(newTodo) {
        //define data that will be sent to airtable
        const payload = {
            records: [
                {
                    fields: {
                        title: newTodo.title,
                        isCompleted: newTodo.isCompleted,
                    },
                },
            ],
        };
        //define options for fetch request
        const options = {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        try {
            setIsSaving(true);
            const resp = await fetch(url, options);
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
            // if response is ok, convert promise from json; destructure records
            const { records } = await resp.json();
            const savedTodo = {
                ...records[0],
                ...records[0].fields,
            };
            // if iscompleted doesn't exist, set it to false
            if (!savedTodo.isCompleted) {
                savedTodo.isCompleted = false;
            }
            //update todoList with the newTodo added on
            setTodoList([...todoList, savedTodo]);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    // function for checking off a todoList item
    function completeTodo(id) {
        const updatedTodos = todoList.map((todo) => {
            // if the id matches a todo item on the list, change isCompleted prop to true
            if (todo.id == id) {
                return { ...todo, isCompleted: true };
            } else return todo;
        });
        // change state to updated list with the checked off item removed
        setTodoList(updatedTodos);
    }

    // function for updating a todo that updates the todo list state when a todo is edited
    async function updateTodo(editedTodo) {
        //save originalTodo in case there is a network issue and the changes need to be reverted. find original todo based on matching id in todoList array
        const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
        // map through the todos, comparing each todo.id with the updated todo's id
        const updatedTodos = todoList.map((todo) => {
            // if the id matches the id of the edited todo, return a new object that destructures the edited todo
            if (todo.id == editedTodo.id) {
                return { ...editedTodo };
            } else return todo;
        });
        // update the todoList state value with updatedTodos
        setTodoList(updatedTodos);
        //create payload object for fetch request
        const payload = {
            records: [
                {
                    id: editedTodo.id,
                    fields: {
                        title: editedTodo.title,
                        isCompleted: editedTodo.isCompleted,
                    },
                },
            ],
        };
        //create an options object for the fetch request using PATCH method
        const options = {
            method: 'PATCH',
            headers: {
                Authorization: token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        //try/catch/finally block in case of error
        try {
            const resp = await fetch(url, options);
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(`${error.message}. Reverting todo...`);
            //go back to original todoList
            const revertedTodos = updatedTodos.map((editedTodo) => {
                if (editedTodo.id == originalTodo.id) {
                    return { ...originalTodo };
                }
            });
            //update state to revertedTodos
            setTodoList([...revertedTodos]);
        } finally {
            //set isSaving state back to false
            setIsSaving(false);
        }
    }

    return (
        <div>
            <h1>My ToDos</h1>
            {/* add instance of TodoForm */}
            <TodoForm onAddTodo={addTodo} isSaving={isSaving}></TodoForm>
            {/* add instance of TodoList */}
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                isLoading={isLoading}
            ></TodoList>
            {errorMessage.length > 0 && (
                <div>
                    <hr />
                    <p>Error: {errorMessage}</p>
                    <button type="button" onClick={handleDismiss}>
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;

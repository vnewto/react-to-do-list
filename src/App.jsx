import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';

//declare url that will be used for fetch requests
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

// define function for building the query for the sort requests
function encodeUrl({ sortField, sortDirection, queryString }) {
    // define a template literal that combines the 2 sort query parameters, field and direction
    let sortQuery = `?sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    // Create an updatable variable (let) searchQuery set to an empty string
    let searchQuery = '';
    // if a search query is included, assign it a value
    if (queryString) {
        searchQuery = `&filterByFormula=SEARCH(LOWER("${queryString}"),+LOWER(title))`;
    }
    // return encode uri method that puts together the url with the sort query and search query
    return encodeURI(`${url}${sortQuery}${searchQuery}`);
}

// declare variable that will be used for fetch requests
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
    // create a new state value for a new todo
    const [todoList, setTodoList] = useState([]);

    // Create an isLoading state variable with a defaultValue of false
    const [isLoading, setIsLoading] = useState(false);

    // Create a state variable for errorMessage and default to an empty string
    const [errorMessage, setErrorMessage] = useState('');

    //create state variable for conditional rendering of isSaving with AddTodo button
    const [isSaving, setIsSaving] = useState(false);

    // create new state variables for sorting
    const [sortField, setSortField] = useState('createdTime');
    const [sortDirection, setSortDirection] = useState('desc');

    // create state variable for search/filter feature
    const [queryString, setQueryString] = useState('');

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
                const resp = await fetch(
                    encodeUrl({ sortField, sortDirection, queryString }),
                    options
                );
                // show error message if response not ok
                if (!resp.ok) {
                    throw new Error(resp.message);
                }
                // if response is ok, convert promise from json
                const data = await resp.json();
                //data comes back as an object with key "records" and value of an array
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
    }, [sortDirection, sortField, queryString]);

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
            const resp = await fetch(
                encodeUrl({ sortField, sortDirection, queryString }),
                options
            );
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
    async function completeTodo(completedTodo) {
        //save originalTodo in case the changes need to be reverted. find original todo based on matching id in todoList array
        const originalTodo = todoList.find(
            (todo) => todo.id === completedTodo.id
        );
        // map through the todos, comparing each todo.id with the updated todo's id
        const updatedTodos = todoList.map((todo) => {
            // if the id matches a todo item on the list, change isCompleted prop to true
            if (todo.id == completedTodo.id) {
                return { ...todo, isCompleted: true };
            } else return todo;
        });
        // change state to updated list with the checked off item removed
        setTodoList(updatedTodos);
        //create payload object for fetch request
        const payload = {
            records: [
                {
                    id: completedTodo.id,
                    fields: {
                        title: completedTodo.title,
                        isCompleted: true,
                    },
                },
            ],
        };
        //create an options object for the fetch request using PATCH method to edit the todo
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
            const resp = await fetch(
                encodeUrl({ sortField, sortDirection, queryString }),
                options
            );
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(`${error.message}. Reverting todo status...`);
            //go back to original todoList
            const revertedTodos = updatedTodos.map((todo) => {
                if (todo.id == originalTodo.id) {
                    return { ...originalTodo };
                } else return todo;
            });
            //update state to revertedTodos
            setTodoList([...revertedTodos]);
        }
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
            const resp = await fetch(
                encodeUrl({ sortField, sortDirection, queryString }),
                options
            );
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(`${error.message}. Reverting todo...`);
            //go back to original todoList
            const revertedTodos = updatedTodos.map((todo) => {
                if (todo.id == originalTodo.id) {
                    return { ...originalTodo };
                } else return todo;
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
            <hr></hr>
            <TodosViewForm
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                queryString={queryString}
                setQueryString={setQueryString}
            ></TodosViewForm>
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

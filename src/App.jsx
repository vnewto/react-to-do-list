import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    useReducer,
} from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import TodosPage from './pages/TodosPage.jsx';
import classes from './App.module.css';
import {
    reducer as todosReducer,
    actions as todoActions,
    initialState as initialTodosState,
} from './reducers/todos.reducer';

//declare url that will be used for fetch requests
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

// declare variable that will be used for fetch requests
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
    //call useReducer function
    const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

    // create new state variables for sorting
    const [sortField, setSortField] = useState('createdTime');
    const [sortDirection, setSortDirection] = useState('desc');

    // create state variable for search/filter feature
    const [queryString, setQueryString] = useState('');

    //function for handling dismissing a message
    function handleDismiss() {
        // set error message back to empty string
        dispatch({ type: todoActions.clearError });
    }

    // create a variable encodeUrl and assign it to a useCallback. this function will be used to build the url for the query requests
    const encodeUrl = useCallback(() => {
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
    }, [sortField, sortDirection, queryString]);

    useEffect(() => {
        const fetchTodos = async () => {
            // set options object for the fetch request
            const options = {
                method: 'GET',
                headers: { Authorization: token },
            };
            // update isLoading to true
            dispatch({ type: todoActions.fetchTodos });
            //set up try/catch/finally block for handling the fetch
            try {
                const resp = await fetch(encodeUrl(), options);
                // show error message if response not ok
                if (!resp.ok) {
                    throw new Error(resp.message);
                }
                // if response is ok, convert promise from json
                const data = await resp.json();
                //data comes back as an object with key "records" and value of an array
                dispatch({
                    type: todoActions.loadTodos,
                    records: data.records,
                });
            } catch (error) {
                dispatch({ type: todoActions.setLoadError, error });
            } finally {
                dispatch({ type: todoActions.endRequest });
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
            dispatch({ type: todoActions.startRequest });
            const resp = await fetch(encodeUrl(), options);
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
            // if response is ok, convert promise from json; destructure records
            const { records } = await resp.json();
            //update todoList with the newTodo added on
            dispatch({ type: todoActions.addTodo, records });
        } catch (error) {
            dispatch({ type: todoActions.setLoadError, error });
        } finally {
            dispatch({ type: todoActions.endRequest });
        }
    }

    // function for checking off a todoList item
    async function completeTodo(completedTodo) {
        //save originalTodo in case the changes need to be reverted. find original todo based on matching id in todoList array
        const originalTodo = todoState.todoList.find(
            (todo) => todo.id === completedTodo.id
        );
        // change state to updated list with the checked off item removed
        dispatch({ type: todoActions.completeTodo, id: originalTodo.id });
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
            const resp = await fetch(encodeUrl(), options);
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
        } catch (error) {
            //update state to revertedTodos
            dispatch({
                type: todoActions.revertTodo,
                editedTodo: originalTodo,
                errorMessage: error.message,
            });
        }
    }

    // function for updating a todo that updates the todo list state when a todo is edited
    async function updateTodo(editedTodo) {
        //save originalTodo in case there is a network issue and the changes need to be reverted. find original todo based on matching id in todoList array
        const originalTodo = todoState.todoList.find(
            (todo) => todo.id === editedTodo.id
        );
        dispatch({ type: todoActions.updateTodo, editedTodo });
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
            const resp = await fetch(encodeUrl(), options);
            // show error message if response not ok
            if (!resp.ok) {
                throw new Error(resp.message);
            }
        } catch (error) {
            //update state to revertedTodos
            dispatch({
                type: todoActions.revertTodo,
                editedTodo: originalTodo,
                errorMessage: error.message,
            });
        } finally {
            //set isSaving state back to false
            dispatch({ type: todoActions.endRequest });
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <img src="./src/assets/react.svg"></img>
                <h1>My ToDos</h1>
            </div>
            <TodosPage
                onAddTodo={addTodo}
                todoState={todoState}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                queryString={queryString}
                setQueryString={setQueryString}
            ></TodosPage>
            <hr />
            {todoState.errorMessage.length > 0 && (
                <div className={classes.errorMessage}>
                    <p>Error: {todoState.errorMessage}</p>
                    <button
                        className={classes.errorButton}
                        type="button"
                        onClick={handleDismiss}
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;

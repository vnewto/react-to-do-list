//Declare an initialState constant and assign it an object with all of the states you are going to use
const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
};

//declare actions object for all the instances where state gets updated in App
const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

//declare reducer function that takes in a state and an action, and has switch statements for each case
function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos:
            return {
                ...state,
                isLoading: true,
            };
        case actions.loadTodos:
            return {
                ...state,
                todoList: [
                    ...action.records.map((record) => {
                        //if iscompleted doesn't exist, set it to false
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
                    }),
                ],
                isLoading: false,
            };
        case actions.setLoadError:
            return {
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
            };
        case actions.startRequest:
            return {
                ...state,
                isSaving: true,
            };
        case actions.addTodo: {
            const savedTodo = {
                ...action.records[0],
                ...action.records[0].fields,
            };
            // if iscompleted doesn't exist, set it to false
            if (!savedTodo.isCompleted) {
                savedTodo.isCompleted = false;
            }
            return {
                ...state,
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
            };
        }

        case actions.endRequest:
            return {
                ...state,
                isLoading: false,
                isSaving: false,
            };
        case actions.revertTodo:
        case actions.updateTodo: {
            // map through the todos, comparing each todo.id with the updated todo's id
            const updatedTodos = state.todoList.map((todo) => {
                // if the id matches the id of the edited todo, return a new object that destructures the edited todo
                if (todo.id == action.editedTodo.id) {
                    return { ...action.editedTodo };
                } else return todo;
            });

            const updatedState = {
                ...state,
                todoList: [...updatedTodos],
                errorMessage: action.error?.message ?? '',
            };

            return {
                ...updatedState,
            };
        }

        case actions.completeTodo: {
            // map through the todos, comparing each todo.id with the updated todo's id
            const updatedTodos = state.todoList.map((todo) => {
                // if the id matches a todo item on the list, change isCompleted prop to true
                if (todo.id == action.id) {
                    return { ...todo, isCompleted: true };
                } else return todo;
            });
            return {
                ...state,
                todoList: [...updatedTodos],
            };
        }
        case actions.clearError:
            return {
                ...state,
                errorMessage: '',
            };
        default:
            return state;
    }
}

export { initialState, actions, reducer };

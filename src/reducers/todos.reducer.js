//Declare an initialState constant and assign it an object with all of the states you are going to use
const initialState = {
    todolist: [],
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
            };
        case actions.loadTodos:
            return {
                ...state,
            };
        case actions.setLoadError:
            return {
                ...state,
            };
        case actions.startRequest:
            return {
                ...state,
            };
        case actions.addTodo:
            return {
                ...state,
            };
        case actions.endRequest:
            return {
                ...state,
            };
        case actions.updateTodo:
            return {
                ...state,
            };
        case actions.completeTodo:
            return {
                ...state,
            };
        case actions.revertTodo:
            return {
                ...state,
            };
        case actions.clearError:
            return {
                ...state,
            };
        default:
            return state;
    }
}

export { initialState, actions, reducer };

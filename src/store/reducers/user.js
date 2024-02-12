const INITIAL_STATE = {
    list: [],
    users: [],
    counter: 3
}

const userReducer = (state = INITIAL_STATE, action) => {
    console.log("action", action)
    if (action.type === "inc") {
        return {
            // ...state,
            counter: state.counter + 1
        }
    }
    return state;
}

export default userReducer;
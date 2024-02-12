import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    count: 2
}

const counter = createSlice({
    name: "counter",
    initialState: INITIAL_STATE,
    reducers: {
        increament(state, action) {
            
            console.log("action", action)
            state.count = state.count + 1
        },
        deccreament(state) {
            state.count = state.count - 1
        }
    }
})

export const { increament, deccreament } = counter.actions;
export default counter.reducer;
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        newAlert() {
            const resetState = ''
            return resetState
        },
        createNewAlert(state, action) {
            return action.payload
        }
    }
})

export const {newAlert, createNewAlert} = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(createNewAlert(message))
        setTimeout(() => {dispatch(newAlert())}, time*1000)
    }
}

export default notificationSlice.reducer
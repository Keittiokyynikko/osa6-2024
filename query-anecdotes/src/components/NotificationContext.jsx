import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
    switch(action.type) {
        case "VOTE":
            return `anecdote ${action.payload} voted`
        case "NEW":
            return `anecdote ${action.payload} created`
        case "ERROR":
            return `too short anecdote, must have length 5 or more`
        case "RESET":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(NotificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const ntfnDispatch = useContext(NotificationContext)
    return ntfnDispatch[0]
}

export const useNotificationDispatch = () => {
    const ntfnDispatch = useContext(NotificationContext)
    return ntfnDispatch[1]
}


export default NotificationContext
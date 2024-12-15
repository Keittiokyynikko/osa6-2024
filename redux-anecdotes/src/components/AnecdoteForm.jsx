import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createNewAlert, newAlert, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async(event) => {
        event.preventDefault()
        const newA = event.target.anecdote.value
        console.log('add', newA)
        dispatch(createNewAnecdote(newA))
        event.target.anecdote.value = ''
        dispatch(setNotification(`you added '${newA}'`, 2))
      }

    return (
      <>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
      </form>
      </>
    )

}

export default AnecdoteForm
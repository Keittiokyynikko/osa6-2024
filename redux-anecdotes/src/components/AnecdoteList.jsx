import { useSelector, useDispatch } from 'react-redux'
import { voteCurrentAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        const votedA = anecdotes.find(a => a.id === id)
        dispatch(voteCurrentAnecdote(votedA))
        dispatch(setNotification(`you voted '${votedA.content}'`, 2))
    }

    return (
        <>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
        </>
    )
}

export default AnecdoteList
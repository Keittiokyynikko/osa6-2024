import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {

  const dispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const queryClient = useQueryClient()

  const editAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  console.log(JSON.parse(JSON.stringify(result)))
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError) {
    return <div>anecdote service not availabe due to problems in server</div>
  }

  const anecdotes = result.data
  console.log("Hello", anecdotes)

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    editAnecdoteMutation.mutate({anecdote})
    dispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => dispatch({type: 'RESET', payload: ''}), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

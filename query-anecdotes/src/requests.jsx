import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = anecdote => {
    console.log(anecdote.anecdote)
    const newAnecdote = {content: anecdote.anecdote.content, id: anecdote.anecdote.id, votes: anecdote.anecdote.votes + 1}
    axios.put(`${baseUrl}/${anecdote.anecdote.id}`, newAnecdote).then(res => res.data)
}
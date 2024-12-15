import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      const anecdote = action.payload
      console.log(anecdote)
      state.push({
        content: anecdote.content,
        id: getId(),
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.filter(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote[0], votes: anecdoteToVote[0].votes + 1}
      const newAnecdotes = state.map(a => a.id !== id ? a : changedAnecdote )
      return newAnecdotes.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  }
})


export const {newAnecdote, voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteCurrentAnecdote = content => {
  return async dispatch => {
    const editedAnecdote = await anecdotesService.voteCurrent(content)
    dispatch(voteAnecdote(editedAnecdote))
  }
}

export default anecdoteSlice.reducer
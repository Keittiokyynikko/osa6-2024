import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async(content) => {
    const anecdote = {content, votes:0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteCurrent = async(content) => {
    const anecdote = {content: content.content, id:content.id, votes: content.votes + 1}
    const response = await axios.put(`${baseUrl}/${content.id}`, anecdote)
    return response.data
}

export default { getAll, createNew, voteCurrent }
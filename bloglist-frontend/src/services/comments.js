import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  console.log('getAll comments')
  const response = await axios.get(`${ baseUrl }/comments`)
  return response.data
}

const addComment = async (comment) => {
    console.log('adding comment', comment)
    const response = await axios.post(`${ baseUrl }/comments`, comment)
    console.log('added new comment', response)
    return response.data
}

export default {getAll, addComment}
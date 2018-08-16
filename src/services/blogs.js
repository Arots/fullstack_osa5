import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const authorization = {
    headers: {'Authorization': token}
  }
  const response = await axios.post(baseUrl, newObject, authorization)
  return response.data
}

const update = async (id, updatedObject) => {
  const authorization = {
    headers: {'Authorization': token}
  }

  const request = await axios.put(`${baseUrl}/${id}`, updatedObject, authorization)
  return request.data
}

const remove = async (id) => {
  const authorization = {
    headers: {'Authorization': token}
  }
  const request = await axios.delete(`${baseUrl}/${id}`, authorization)
  return request.data
}

export default { getAll, setToken, create, update, remove }
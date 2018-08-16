import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, setToken, create, update }
import axios from 'axios'

const API_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchItems = async () => {
  try {
    const response = await api.get('/items')
    return response.data
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}

export const fetchItem = async (id) => {
  try {
    const response = await api.get(`/items/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching item:', error)
    throw error
  }
}

export const createItem = async (item) => {
  try {
    const response = await api.post('/items', item)
    return response.data
  } catch (error) {
    console.error('Error creating item:', error)
    throw error
  }
}

export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}

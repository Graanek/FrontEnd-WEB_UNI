import { useState, useEffect } from 'react'
import { fetchItems, createItem, deleteItem } from './api/api'
import './styles/App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      const data = await fetchItems()
      setItems(data)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const createdItem = await createItem(newItem)
      setItems([...items, createdItem])
      setNewItem({ name: '', description: '' })
    } catch (error) {
      console.error('Error creating item:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteItem(id)
      setItems(items.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div className="app-container">
      <h1>FastAPI + Vite React App</h1>
      
      <div className="form-container">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newItem.description || ''}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            />
          </div>
          
          <button type="submit">Add Item</button>
        </form>
      </div>
      
      <div className="items-container">
        <h2>Items List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items found. Add your first item!</p>
        ) : (
          <ul className="items-list">
            {items.map((item) => (
              <li key={item.id} className="item-card">
                <h3>{item.name}</h3>
                <p>{item.description || 'No description'}</p>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
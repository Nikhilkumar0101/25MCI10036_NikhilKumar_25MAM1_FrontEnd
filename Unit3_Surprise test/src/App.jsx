import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  const inputRef = useRef(null)

  const handleAddorUpdate = () => {
    if(input.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...notes]
      updated[editIndex] = input
      setNotes(updated)
      setEditIndex(null)
    }
    else{
      setNotes([...notes, input])
    }

    setInput("");
    inputRef.current.focus()
  }

  const handleEdit = (index) => {
    setInput(notes[index])
    setEditIndex(index)
    inputRef.current.focus()
  }

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index))
    if (editIndex === index) {
      setInput("")
      setEditIndex(null)
    }
  }

  return (
    <div className="container">
      <h2>Note App</h2>
      <div className="inputSection">
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter Note...' />
        <button onClick={handleAddorUpdate}>Add Note</button>
      </div>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

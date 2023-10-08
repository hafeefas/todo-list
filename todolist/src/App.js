import React, { useState } from 'react'
import './App.css';

function App() {

  const [newItem, setNewItem] = useState("")
  const [addedDate, setAddedDate] = useState("")
  const [items, setItems] = useState([])

  // helper functions
  const addItem = () => {

    //before adding an item input, let's make sure the user has typed in something first:
    if (!newItem) {
      alert("Enter an item")
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000), //id for sorting
      value: newItem, //we get this from the input
      date: addedDate
    }
    //cloning the old list as well as the newly added list
    setItems(oldList => [...oldList, item])
    setNewItem("")
    setAddedDate("")

    console.log(items, "array")
  }

  const deleteItem = (id) => {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  return (
    <div className="App">
      {/* 1. Header */}
      <h1> TODO LIST APP </h1>
      {/* 2. Input (INPUT AND BUTTON)  */}
      <input
        type="text"
        placeholder='Add an item...'
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <input
        type="date"
        placeholder='Add a due date...'
        value={addedDate}
        onChange={(e) => { e.target.value() }}

      />
      <button onClick={() => addItem()}> Add </button>
      {/* 3. List of items */}
      <ul>
        {items.map(item => {
          return (
            <li key={item.id}> {item.value}
              <button onClick={() => deleteItem(item.id)}> delete </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
// https://www.youtube.com/watch?v=-l0FEONO-cM
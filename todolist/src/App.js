import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [newItem, setNewItem] = useState("")
  const [addedDate, setAddedDate] = useState("")
  const [items, setItems] = useState([])
  const [selectedPriority, setSelectedPriority] = useState("low");


  const LOWEST_PRIORITY = 'low'
  const MEDIUM_PRIORITY = 'medium'
  const HIGHEST_PRIORITY = "high"

  // helper functions
  const addItem = (priority) => {
    //before adding an item input, make sure the user has typed in something first:
    if (!newItem || !addedDate) {
      alert("Enter an item and a complete date")
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000), //id for sorting
      value: newItem, //we get this from the input
      date: addedDate,
      completed: false, //makes the box unchecked initially
      priority: selectedPriority,
    }

    //cloning the old list as well as the newly added list to update the list of items
    setItems(oldList => [...oldList, item])

    //clears input fields after adding the item as done in the above line of code
    setNewItem("")
    setAddedDate("")

    // console.log(items, "array")
  };


  const toggleCompleted = (id) => {
    //map over the items that already exist 
    const updatedItems = items.map((item) => {
      if (item.id === id) { //if the item ID is a match with the click item's ID
        return { ...item, completed: !item.completed } //toggle the completed state
      }
      return item;
    })
    //updates list of items and the checkboxes
    setItems(updatedItems)
  };


  // Use useEffect to log the priority of items after the component renders
  useEffect(() => {
    items.forEach((item) => {
      console.log(`${item.value} has priority: ${item.priority}`);
    });
  }, [items]);


  const deleteItem = (id) => {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

    //handle the selected priority dropdown change
    const handlePriorityChange = (e) => {
      setSelectedPriority(e.target.value);
    };
  
  return (
    <div className="App">
      <h1> TODO LIST APP </h1>

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
        onChange={(e) => setAddedDate(e.target.value)}

      />
      {/* priority drowpdown selection */}
      <select value={selectedPriority} onChange={handlePriorityChange}>
        <option value={LOWEST_PRIORITY}> Low Priority </option>
        <option value={MEDIUM_PRIORITY}> Medium Priority </option>
        <option value={HIGHEST_PRIORITY}> Highest Priority </option>
      </select>

      <button onClick={() => addItem()}> Add </button>
      {/* List of items */}
      <ul>
        {items.map(item => {
          let priorityClass = ''

          if (item.priority === LOWEST_PRIORITY) {
            priorityClass = 'low-priority'
            console.log(`${item.value} has low priority.`);

          } else if (item.priority === MEDIUM_PRIORITY) {
            priorityClass = 'medium-priority'
            console.log(`${item.value} has medium priority.`);

          } else if (item.priority === HIGHEST_PRIORITY) {
            priorityClass = 'high-priority'
            console.log(`${item.value} has high priority.`);

          }
          return (
            <li key={item.id} className={priorityClass}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
              />
              {item.value} ({item.date})
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
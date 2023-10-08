import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState('');
  const [addedDate, setAddedDate] = useState('');
  const [items, setItems] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('low');
  const [completedItemId, setCompletedItemId] = useState(null);
  const [showPopup, setShowPopup] = useState([]); // Array to track popups for each item

  const LOWEST_PRIORITY = 'low';
  const MEDIUM_PRIORITY = 'medium';
  const HIGHEST_PRIORITY = 'high';

  // helper functions
  const addItem = () => {
    //before adding an item input, make sure the user has typed in something first:
    if (!newItem || !addedDate) {
      alert('Enter an item and a complete date');
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000), // id for sorting
      value: newItem, // we get this from the input
      date: addedDate,
      completed: false, // makes the box unchecked initially
      priority: selectedPriority,
    };

    // cloning the old list as well as the newly added list to update the list of items
    setItems((oldList) => [...oldList, item]);

    // clears input fields after adding the item as done in the above line of code
    setNewItem('');
    setAddedDate('');
  };

  const toggleCompleted = (id) => {
    // map over the items that already exist
    const updatedItems = items.map((item, index) => {
      if (item.id === id) {
        // if the item ID is a match with the click item's ID
        const updatedItem = { ...item, completed: !item.completed };

        // Toggle the popup for this item
        if (!updatedItem.completed) {
          // Hide the popup immediately if the checkbox is unchecked
          const updatedShowPopup = [...showPopup];
          updatedShowPopup[index] = false;
          setShowPopup(updatedShowPopup);
        } else {
          // Automatically show the popup for checked items
          togglePopup(id);
        }

        return updatedItem;
      }
      return item;
    });
    // updates the list of items and the checkboxes
    setItems(updatedItems);
  };

  const togglePopup = (id) => {
    // Create a copy of the showPopup array and toggle the value for the item with the given ID
    const updatedShowPopup = [...showPopup];
    const index = items.findIndex((item) => item.id === id);
    updatedShowPopup[index] = !updatedShowPopup[index];
    setShowPopup(updatedShowPopup);

    // Automatically hide the popup after 2 seconds
    setTimeout(() => {
      updatedShowPopup[index] = false;
      setShowPopup(updatedShowPopup);
    }, 2000);
  };

  // Use useEffect to log the priority of items after the component renders
  useEffect(() => {
    items.forEach((item) => {
      // console.log(`${item.value} has priority: ${item.priority}`);
    });
  }, [items]);

  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  };

  // handle the selected priority dropdown change
  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">TODO LIST APP</h1>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Add task..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                value={addedDate}
                placeholder="Due Date..."
                onChange={(e) => setAddedDate(e.target.value)}
              />
              <select
                className="form-select"
                value={selectedPriority}
                onChange={handlePriorityChange}
              >
                <option value={LOWEST_PRIORITY}>Low Priority</option>
                <option value={MEDIUM_PRIORITY}>Medium Priority</option>
                <option value={HIGHEST_PRIORITY}>High Priority</option>
              </select>
              <button className="btn btn-primary" onClick={addItem}>
                Add
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <ul className="list-group">
                {items.map((item, index) => (
                  <li
                    style={{ marginBottom: '10px' }}
                    key={item.id}
                    className={`list-group-item ${
                      item.id === completedItemId
                        ? 'completed'
                        : item.priority === LOWEST_PRIORITY
                        ? 'low-priority'
                        : item.priority === MEDIUM_PRIORITY
                        ? 'medium-priority'
                        : item.priority === HIGHEST_PRIORITY
                        ? 'high-priority'
                        : ''
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        id={`flexCheckDefault_${item.id}`}
                        type="checkbox"
                        value=""
                        aria-label="Checkbox for following text input"
                        checked={item.completed}
                        onChange={() => toggleCompleted(item.id)}
                      />
                      <div>
                        Task: {item.value} || Due Date: ({item.date})
                      </div>
                      <button
                        className="btn btn-danger ms-auto"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                    {showPopup[index] && (
                      <div className="popup mt-2">
                        {/* You can put celebratory visual or sound effects here */}
                        <p>Congratulations! Task Completed!</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

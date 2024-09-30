import React, { useEffect, useState } from "react";
import { fetchItems, createItem, fetchItemById } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();
      setItems(data);
    };

    getItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = await createItem({ title, description });
    setItems([...items, newItem]);
    setTitle("");
    setDescription("");
  };

  const handleItemClick = async (id) => {
    const item = await fetchItemById(id);
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Add Item</button>
        </form>
        <div style={{ display: "flex" }}>
          <ul style={{ flex: 1 }}>
            {items.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item.id)}>
                {item.title}
              </li>
            ))}
          </ul>
          {selectedItem && (
            <div style={{ flex: 1 }}>
              <h2>Selected Item Details</h2>
              <p>ID: {selectedItem.id}</p>
              <p>Title: {selectedItem.title}</p>
              <p>Description: {selectedItem.description}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

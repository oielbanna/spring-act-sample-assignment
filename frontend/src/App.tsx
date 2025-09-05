import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search form submitted:', { location, category });
  };

  return (
    <div className="App">
      <h1 style={{color: 'white', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '300'}}>Find Resources</h1>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="domestic-violence">Domestic Violence</option>
            <option value="mental-health">Mental Health</option>
            <option value="legal-aid">Legal Aid</option>
            <option value="housing">Housing</option>
          </select>
        </div>

        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default App;

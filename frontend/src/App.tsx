import React, { useState } from 'react';
import './App.css';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const CATEGORIES = [
  { value: '', label: 'Select Category' },
  { value: 'domestic-violence', label: 'Domestic Violence' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'legal-aid', label: 'Legal Aid' },
  { value: 'housing', label: 'Housing' },
];

function App() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const handleSearch = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log('Search form submitted:', { location, category });
    try {
      const response = await fetch(`${BASE_URL}/api/resources?location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`);
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }


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
              {CATEGORIES.map((category) => (
                <option value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">Search</button>
        </form>
      <div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <div className="loading-text">
              <h3>Searching for resources...</h3>
              <p>Please wait while we find the best matches for you</p>
            </div>
          </div>
        ) : (
          <>
            {data.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                marginTop: '1rem',
                width: '100%',
                maxWidth: '900px'
              }}>
                {data.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(255,255,255,0.98)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      padding: '1.5rem 1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '220px',
                      borderLeft: `6px solid ${
                        item.category === 'domestic-violence'
                          ? '#e57373'
                          : item.category === 'mental-health'
                          ? '#64b5f6'
                          : item.category === 'legal-aid'
                          ? '#81c784'
                          : '#ba68c8'
                      }`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        marginRight: '0.5rem'
                      }}>{item.name}</span>
                      {item.available24h && (
                        <span style={{
                          background: '#388e3c',
                          color: 'white',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          marginLeft: 'auto'
                        }}>24/7</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '0.5rem' }}>
                      <strong>Category:</strong> {item.category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '0.5rem' }}>
                      <strong>Location:</strong> {item.location}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '0.5rem' }}>
                      <strong>Phone:</strong> {item.phone}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '0.5rem' }}>
                      <strong>Website:</strong>{' '}
                      <a
                        href={item.website.startsWith('http') ? item.website : `https://${item.website.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                      >
                        {item.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '0.5rem' }}>
                      <strong>Description:</strong> {item.description}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

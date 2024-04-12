import { useState, useEffect } from 'react';
import './App.css';
import JSONdata from './data.json';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter data
  const filterData = (query) => {
    const filtered = originalData.filter((item) =>
      Object.values(item).some(
        (value) =>
          value.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    );
    setFilteredData(filtered);
  };

  // Debouncing function
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounce the filter function
  const debouncedFilter = debounce(filterData, 300);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFilter(query);
  };

  useEffect(() => {
    setOriginalData(JSONdata);
    setFilteredData(JSONdata);
  }, []);

  return (
    <div className='main-container'>
      <div className="input-container">
        <div className="card-inner">
          <label>{filteredData.length} results found</label>
          <div className="container">
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className="input-box">
              <input placeholder="Search by ID, address, name, item or pincode" value={searchQuery} onChange={handleSearchChange} />
            </div>
          </div>
        </div>
      </div>
      <div className='results-container'>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={`${item.id}`} className="result-box">
              <div className="result-box-header">
                <div>{item.name}</div>
                <div>{item.items.join(', ')}</div>
              </div>
              <div className="result-box-header">
                <div>{item.address}</div>
                <div>{item.pincode}</div>
              </div>
            </div>
          ))
        ) : (
          <div className='result-box no-data-box'>No data found !</div>
        )}
      </div>
    </div>
  );
}

export default App;

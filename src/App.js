import { useState, useEffect, useRef } from 'react';
import './App.css';
import JSONdata from './data.json';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

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
    setHighlightedIndex(0); // Reset highlighted index when typing
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredData.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
    setOriginalData(JSONdata);
    setFilteredData(JSONdata);
  }, []);

  useEffect(() => {
    inputRef.current.focus(); // Focus on input field on component mount
  }, []);

  useEffect(() => {
    // Scroll highlighted card into view
    const highlightedElement = document.querySelector('.highlighted');
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedIndex]);

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
              <input
                ref={inputRef}
                placeholder="Search by ID, address, name, item or pincode"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Handle keyboard events for navigation
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className='results-container'
        ref={resultsRef}
        tabIndex={0} // Make the div focusable
      >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={`${item.id}`}
              className={`result-box ${highlightedIndex === index ? 'highlighted' : ''}`}
            >
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

import { useState, useEffect, useRef } from 'react';
import './App.css';
import JSONdata from './data.json';
import ResultCard from './components/ResultCard';
import InputContainer from './components/InputContainer';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [highlightedIndex])

  // Function to filter data
  const filterData = (query) => {
    if (query.trim() === "") {
      setFilteredData([]);
    } else {
      const filtered = originalData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      );
      setFilteredData(filtered);
    }
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
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  // Handle mouse enter on result box
  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  useEffect(() => {
    setOriginalData(JSONdata);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    // Scroll highlighted card into view
    const highlightedElement = document.querySelector('.highlighted');
    if (highlightedElement) {
      highlightedElement.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
  }, [highlightedIndex]);

  return (
    <div className='main-container'>
      <InputContainer filteredData={filteredData} searchQuery={searchQuery} inputRef={inputRef} handleSearchChange={handleSearchChange} handleKeyDown={handleKeyDown} />
      <div
        className={'results-container'}
        ref={resultsRef}
        tabIndex={0}
      >
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={`${item.id}`}
            className={`result-box ${highlightedIndex === index ? 'highlighted' : ''}`}
            onMouseMove={() => handleMouseEnter(index)}
          >
            <div className="result-box-header">
              <ResultCard key={item.id} item={item} searchQuery={searchQuery} id="id" />
              <ResultCard key={item.id} item={item} searchQuery={searchQuery} id="name" />
            </div>
            {
              item.items?.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase())) && (
                  <li>
                    "{searchQuery}" found in items
                  </li>
              )
            }
            <div className="result-box-header">
              <ResultCard key={item.id} item={item} searchQuery={searchQuery} id="address" />
              <ResultCard key={item.id} item={item} searchQuery={searchQuery} id="pincode" />
            </div>
          </div>
        ))
      ) : !searchQuery ? (
        <div className='result-box no-data-box'>Please input some text to search !</div>
      ) : (
        <div className='result-box no-data-box'>No data found !</div>
      )}

      </div>
    </div>
  );
}

export default App;

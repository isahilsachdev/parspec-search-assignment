import React from 'react'
import "../App.css"

const InputContainer = ({filteredData, searchQuery, inputRef, handleSearchChange, handleKeyDown}) => {
  return (
    <div className="input-container">
      <div className="card-inner">
        <label>{filteredData.length} results found</label>
        <div className="container">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div className="input-box">
            <input
              value={searchQuery}
              ref={inputRef}
              placeholder="Search by ID, address, name, item or pincode"
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputContainer
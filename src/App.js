import { useState } from 'react';
import './App.css';
import JSONdata from './data.json';

function App() {
  const [data, setData] = useState(JSONdata);
 
  return (
    <div className='main-container'>
      <div className="input-container">
        <div className="card-inner">
          {<label>2 results found</label>}
          <div className="container">
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className="input-box">
              <input placeholder="Search by ID, address, name, item or pincode"/>
            </div>
          </div>
        </div>
      </div>
      <div className='results-container'>
        {
          data?.length > 0 ? (
            data.map((item, id) => (
              <div key={`${item.id}`} className="result-box">
                <div className="result-box-header">
                  <div>
                    {item.name}
                  </div>
                  <div>
                    {item.items.join(', ')}
                  </div>
                </div>
                <div className="result-box-header">
                  <div>
                    {item.address}
                  </div>
                  <div>
                    {item.pincode}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              No data found
            </div>  
          )
        }
      </div>
    </div>
  );
}

export default App;

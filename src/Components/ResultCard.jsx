import React from 'react';

const ResultCard = ({ item, searchQuery, id }) => {
  return (
    <div>
      {item[id].split(new RegExp(`(${searchQuery})`, 'i')).map((part, index) => (
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={index} style={{ color: 'blue' }}>{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </div>
  );
};

export default ResultCard;

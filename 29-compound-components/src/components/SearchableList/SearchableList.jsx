import { useState } from 'react';

let timeout = null;

function debounce(fn, ms) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(fn, ms);
}

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    debounce(() => {
      setSearchTerm(event.target.value);
    }, 1000);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>
            {children(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ placeholder = "Search..." }: { placeholder?: string }) => {
  return (
    <div className="search-wrapper">
      <Search size={18} className="search-icon" />
      <input type="text" placeholder={placeholder} className="search-input" />
    </div>
  );
};

export default SearchBar;
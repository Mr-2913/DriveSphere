import "./css/SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cars..."
        />

             </div>
    </>
  );
}

export default SearchBar;

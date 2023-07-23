//external import
import { useEffect, useState } from "react";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    props.onSearch(searchText);
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        placeholder="search a country"
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;

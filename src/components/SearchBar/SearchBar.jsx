import { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import { ImageContext } from "../../App";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { fetchData, setSearchImage } = useContext(ImageContext);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    fetchData(
      `search/photos?page=1&query=${input}&client_id=vpN6aaOmzhay294brMX_8TgxPbij2lFMSv_0xfx8Wyc`
    );
    setInput("");
    setSearchImage(input);
  };

  const handleInputSearch = (e) => {
    if (e.key === "Enter") {
      fetchData(
        `search/photos?page=1&query=${input}&client_id=vpN6aaOmzhay294brMX_8TgxPbij2lFMSv_0xfx8Wyc`
      );
      setInput("");
      setSearchImage(input);
    }
  };

  return (
    <div className={styles["search-container"]}>
      <input
        type="search"
        placeholder="Search Anything..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputSearch}
      />
      <button onClick={handleSearch} disabled={!input}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

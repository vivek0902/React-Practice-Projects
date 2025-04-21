import { useEffect, useState, useRef } from "react";
import Information from "./dashboard";
import "./SearchBox.css";

const STATE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fetchStatus, setStatus] = useState(STATE.IDLE);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [localStoredValues, setLocalStoredValues] = useState([]);
  const [isLocalStoredResultsVisible, setIsLocalStoredResultsVisible] =
    useState(true);
  const cache = useRef({});
  // console.log(localStoredValues);
  useEffect(() => {
    // Load stored fetchedData from localStorage
    const storedData = JSON.parse(localStorage.getItem("lastname")) || [];
    setLocalStoredValues(storedData);
  }, []);

  function clickHandle(name) {
    const info = searchResults.find((dt) => dt.name === name);
    setFetchedData(info);

    let storedRecipes = JSON.parse(localStorage.getItem("lastname")) || [];

    if (storedRecipes.some((recipe) => recipe.name === info.name)) {
      setIsSearchResultsVisible(false);
      return;
    }

    storedRecipes.push(info);
    localStorage.setItem("lastname", JSON.stringify(storedRecipes));
    setLocalStoredValues(storedRecipes);
    setIsSearchResultsVisible(false);
  }

  function clickHandleForLocalStroageResults(name) {
    setIsLocalStoredResultsVisible(false);
    fetchStoredRecipe(name);
  }

  async function fetchStoredRecipe(name) {
    try {
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${name}`);
      const data = await res.json();
      setSearchResults(data.recipes);
      const info = data.recipes.find((dt) => dt.name === name);
      setFetchedData(info);
    } catch (error) {
      console.error("Error fetching stored recipe:", error);
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setStatus(STATE.IDLE);
      setIsLocalStoredResultsVisible(true);
      return;
    }

    setIsLocalStoredResultsVisible(false);
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        if (cache.current[query]) {
          setSearchResults(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }
        setStatus(STATE.LOADING);

        const res = await fetch(
          `https://dummyjson.com/recipes/search?q=${query}`,
          { signal }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (!data.recipes || data.recipes.length === 0) {
          throw new Error("No recipes found.");
        }

        cache.current[query] = data.recipes;
        setSearchResults(data.recipes);
        setStatus(STATE.SUCCESS);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setStatus(STATE.ERROR); // Ensure error state is set
        setSearchResults([]); // Clear results on error
      }
    };

    const timer = setTimeout(fetchData, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  function handle() {
    if (!query.trim()) {
      setIsLocalStoredResultsVisible(true);
    }
    setIsSearchResultsVisible(true);
  }

  function ondelete(val) {
    let cpylocalStoredValues = [...localStoredValues];
    let updatedValue = cpylocalStoredValues.filter((item) => item.name !== val);
    localStorage.setItem("lastname", JSON.stringify(updatedValue));
    setLocalStoredValues(updatedValue);
    // console.log(updatedValue);
  }
  return (
    <div className="maincontainer">
      <div className="search-container">
        <h1 className="search-title">Recipe Finder</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for delicious recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handle}
          />
        </div>

        <div className="search-results">
          {localStoredValues.length > 0 && isLocalStoredResultsVisible && (
            <ul className="result-list">
              {localStoredValues.map((val, index) => (
                <div key={index} className="list-container">
                  <li
                    className="result-item"
                    onClick={() => clickHandleForLocalStroageResults(val.name)}
                  >
                    <div className="result-title">{val.name}</div>
                    <div className="result-subtext">
                      {val.cuisine} • {val.difficulty} •{" "}
                      {val.caloriesPerServing} kcal
                    </div>
                  </li>
                  <span
                    className="deletebutton"
                    onClick={() => {
                      ondelete(val.name);
                    }}
                  >
                    🗙
                  </span>
                </div>
              ))}
            </ul>
          )}
        </div>

        {fetchStatus === STATE.LOADING && (
          <div className="loading-text">Loading...</div>
        )}
        {fetchStatus === STATE.ERROR && (
          <div className="error-text">Data Not Found!</div>
        )}

        <div className="search-results">
          {fetchStatus === STATE.SUCCESS &&
            searchResults.length > 0 &&
            isSearchResultsVisible && (
              <ul className="result-list">
                {searchResults.map((val) => (
                  <li
                    className="result-item"
                    key={val.id}
                    onClick={() => clickHandle(val.name)}
                  >
                    <div className="result-title">{val.name}</div>
                    <div className="result-subtext">
                      {val.cuisine} • {val.difficulty} •{" "}
                      {val.caloriesPerServing} kcal
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
      {fetchedData && (
        <Information data={fetchedData} show={setIsSearchResultsVisible} />
      )}
    </div>
  );
}

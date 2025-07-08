import { useState, useEffect } from 'react';
import './countrysearch.css';

function CountriesSearch() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched countries:", data);
        console.log("First country object:", data[0]);
        console.log("All keys in first country:", Object.keys(data[0]));
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }, []);

  const searchCountries = countries.filter((country) => {
    if (!country.common) return false;
    if (!search) return true;
    return country.common.toLowerCase().includes(search.toLowerCase());
  });

  console.log("Filtered countries:", searchCountries);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for Countries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
      />
      <div className="flexbox">
        {searchCountries.map((country) => (
          <div key={country.common} className="countryCard">
            <img
              src={country.png}
              alt={`Flag of ${country.common}`}
              className="image"
            />
            <p className="countryName">{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountriesSearch;

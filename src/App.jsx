//external import
import { useEffect, useState } from "react";

//internal import
import "./App.css";
import Countries from "./components/Countries";
import style from "./search.module.css";
import Search from "./components/Search";
const url = "https://restcountries.com/v3.1/all";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter((country) => {
      return country.name.common !== name;
    });
    setFilteredCountries(filter);
  };

  const handleSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    const newCountry = filteredCountries.filter((county) => {
      const countryName = county.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountry);
  };

  return (
    <>
      <h1>Country App</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h3>{error.message}</h3>}

      <Search onSearch={handleSearch} classname={style.input} />

      <Countries
        countries={filteredCountries}
        onRemoveCountry={handleRemoveCountry}
      />

      <h3>Copyright All Rights Reserved by Nazimuddin</h3>
    </>
  );
}

export default App;

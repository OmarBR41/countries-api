import { useEffect, useRef, useState } from "react";

import axios from "axios";

import "../styles/App.scss";

import Header from "./Header";
import SearchBox from "./SearchBox";
import FilterDropdown from "./FilterDropdown";
import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [queryCountries, setQueryCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [region, setRegion] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    fetchCountries();
    console.log("fetched");
  }, []);

  useEffect(() => {
    const newCountries = queryCountries.filter((country) =>
      country.region.includes(region)
    );
    setFilteredCountries(newCountries);
  }, [queryCountries, region]);

  const fetchCountries = async () => {
    const res = await axios.get("https://restcountries.eu/rest/v2/all");
    const newCountries = res.data;

    setCountries(newCountries);
    setQueryCountries(newCountries);
    setFilteredCountries(newCountries);
  };

  const onSearchChange = () => {
    const query = searchRef.current.value;

    if (query === "") {
      setQueryCountries(countries);
    } else {
      const newCountries = countries.filter((country) => {
        const lowerName = country.name.toLowerCase();
        const lowerQuery = query.toLowerCase();

        if (lowerName.includes(lowerQuery)) return country;
      });
      setQueryCountries(newCountries);
    }
  };

  const onFilterChange = (region) => {
    if (region === null) {
      setRegion("");
    } else {
      setRegion(region.label);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        <SearchBox searchRef={searchRef} onSearchChange={onSearchChange} />
        <FilterDropdown onFilterChange={onFilterChange} />
        <Countries countries={filteredCountries} />
      </div>
    </div>
  );
}

export default App;
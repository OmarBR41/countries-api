import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import SearchBox from './SearchBox';
import FilterDropdown from './FilterDropdown';
import Countries from './Countries';
import Loader from './Loader';

export default function Home({ setSelectedCountry }) {
  const [countries, setCountries] = useState([]);
  const [queryCountries, setQueryCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('');

  const searchRef = useRef(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const newCountries = queryCountries.filter((country) =>
      country.region.includes(region),
    );
    setFilteredCountries(newCountries);
  }, [queryCountries, region]);

  const fetchCountries = async () => {
    setLoading(true);
    const res = await axios.get('https://restcountries.com/v3.1/all');
    const newCountries = res.data;
    console.log(res.data[0]);

    setCountries(newCountries);
    setQueryCountries(newCountries);
    setFilteredCountries(newCountries);
    setLoading(false);
  };

  const onSearchChange = () => {
    const query = searchRef.current.value;

    if (query === '') {
      setQueryCountries(countries);
    } else {
      const lowerQuery = query.toLowerCase();

      const newCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(lowerQuery),
      );
      setQueryCountries(newCountries);
    }
  };

  const onFilterChange = (region) => {
    if (region === null) {
      setRegion('');
    } else {
      setRegion(region.label);
    }
  };

  return (
    <>
      <div className="filters">
        <SearchBox searchRef={searchRef} onSearchChange={onSearchChange} />
        <FilterDropdown onFilterChange={onFilterChange} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Countries
          countries={filteredCountries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </>
  );
}

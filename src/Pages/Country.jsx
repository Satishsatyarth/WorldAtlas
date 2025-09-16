import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../Api/PostApi";
import { Loader } from "../Component/UI/Loader";
import { CountryCard } from "../Component/Layout/CountryCard";
import { SearchFilter } from "../Component/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryData();
        setCountries(res); // ✅ res already contains .data in PostApi
      } catch (err) {
        setError(err.message || "Failed to load country data.");
      }
    });
  }, []);

  if (isPending) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return true; // ✅ must return boolean, not object
  };

  const filterRegion = (country) => {
    if (filter === "all") return true;
    return country.region === filter;
  };

  // main logic
  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      <ul className="grid grid-four-cols">
        {filterCountries.map((curCountry, index) => (
          <CountryCard country={curCountry} key={index} />
        ))}
      </ul>
    </section>
  );
};

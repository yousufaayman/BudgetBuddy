import React, { useEffect } from "react";

export const CountryList = (countries, setCountries) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA.localeCompare(nameB);
        });

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);
};
export default CountryList;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const CountryLanguageSelect = ({
  businessType,
  selectedCountry,
  setSelectedCountry,
  selectedLanguage,
  setSelectedLanguage,
  onNext,
}) => {
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [currentCountry, setCurrentCountry] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");

  const handleAddBusiness = (e) => {
    addBusiness({ country: e.target.value });
  };

  useEffect(() => {
    // Fetch list of countries on mount
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countryList = res.data
        .map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Optional: sort alphabetically
      setCountries(countryList);
    });
  }, []);

  useEffect(() => {
    // Reset language if country changes
    setLanguages([]);
    setSelectedLanguage("");

    if (selectedCountry) {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${selectedCountry}`)
        .then((res) => {
          const langs = res.data[0]?.languages || {};
          setLanguages(Object.values(langs));
        });
    }
  }, [selectedCountry]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Business Type: <span className="text-blue-600">{businessType}</span>
      </h2>

      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium">Country</label>
        <select
          className="w-full mt-1 p-2 border rounded"
          value={selectedCountry || ""}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Language Dropdown */}
      {languages.length > 0 && (
        <div>
          <label className="block text-sm font-medium">Language</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select a language</option>
            {languages.map((lang, idx) => (
              <option key={idx} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Continue Button */}
      {selectedCountry && selectedLanguage && (
        <button
          onClick={onNext}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default CountryLanguageSelect;

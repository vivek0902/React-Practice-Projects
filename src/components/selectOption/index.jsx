import { useState } from "react";
import data from "./data";
import "./style.css";
export default function Select() {
  const [selectCountry, setSelectCountry] = useState("");
  const [selectState, setSelectState] = useState("");

  const selectedCountryData = data.find(
    (countryData) => countryData.country === selectCountry
  );
  console.log(selectCountry);
  console.log(selectState);

  console.log(selectedCountryData);
  return (
    <div className="wrapper">
      {data && data.length > 0 ? (
        <select
          onChange={(e) => {
            setSelectCountry(e.target.value);
            setSelectState("");
          }}
          value={selectCountry}
        >
          <option value="">Select a country</option>
          {data.map((countryList) => (
            <option key={countryList.id} value={countryList.country}>
              {countryList.country}
            </option>
          ))}
        </select>
      ) : (
        "No countries available"
      )}

      {selectedCountryData ? (
        <select
          onChange={(e) => setSelectState(e.target.value)}
          value={selectState}
        >
          <option value="">Select a state</option>
          {selectedCountryData.states.map((stateList, index) => (
            <option key={index} value={stateList}>
              {stateList}
            </option>
          ))}
        </select>
      ) : (
        "Select a country first"
      )}
      <h3>Selected Country: {selectCountry || "None"}</h3>
      <h3>Selected State: {selectState || "None"}</h3>
    </div>
  );
}

/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import PremiumJsonData from "../backendData/premiumJsonData";
import FreeJsonData from "../backendData/FreeJsonData";
import FeatureFlagContext from "../context/FeatureFlagContext";

// FeatureFlagProvider now accepts a `userType` prop (either "free" or "premium")
export const FeatureFlagProvider = ({ userType, children }) => {
  const [features, setFeatures] = useState({});

  useEffect(() => {
    //getting data from local object
    const featureFile = userType === "premium" ? PremiumJsonData : FreeJsonData;
    setFeatures(featureFile);

    // Decide which feature set to load
    //fetching from API

    // const featureFile =
    //   userType === "premium" ? "/api/premium.json" : "/api/free.json";

    // fetch(featureFile)
    //   .then((res) => res.json())
    //   .then((data) => setFeatures(data)) //putting api values to setFeatures
    //   .catch(() => console.error("Failed to load features"));
  }, [userType]);

  return (
    <FeatureFlagContext.Provider value={features}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

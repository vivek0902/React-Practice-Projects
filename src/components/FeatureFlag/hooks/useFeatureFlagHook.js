import { useContext } from "react";
import FeatureFlagContext from "../context/FeatureFlagContext";
// Custom Hook to use the feature flags
const useFeatureFlag = (feature) => {
  const features = useContext(FeatureFlagContext);
  return features[feature] ?? false; // Return `false` if feature is not found
};

export default useFeatureFlag;

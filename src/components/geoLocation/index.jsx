import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const API_endpoint = `https://api.geoapify.com/v1/geocode/reverse?`;
const API_key = `ed608e604047498bbccc94d1f605452f`;

// https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=ed608e604047498bbccc94d1f605452f

const GeoLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currectLocation, setCurrentLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  console.log(currectLocation);
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        setLocationError(true);
        setLoading(false);
      }
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat);
        setLongitude(long);

        let final_API_endpoint = `${API_endpoint}lat=${lat}&lon=${long}&apiKey=${API_key}`;
        // console.log(final_API_endpoint);

        axios
          .get(final_API_endpoint)
          .then((res) => {
            setCurrentLocation(res.data.features[0].properties);
            setLoading(false);
          })
          .catch((error) => {
            console.error("API Error:", error);
            setLoading(false);
          });
      },
      (error) => {
        console.error("Geolocation Error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(true);
        }
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      {locationError ? (
        <div className="error-message">
          <p>⚠️ Location access is denied.</p>
          <p>🔄 Please enable location permissions and reload the page.</p>
          <p>To enable location access:</p>
          <ul>
            <li>🔒 Click on the lock icon in the address bar.</li>
            <li>🌍 Find Location and click to Reset Permission.</li>
            <li>🔄 Reload this page.</li>
          </ul>
        </div>
      ) : loading ? (
        <div className="skeleton-loader">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <br />
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      ) : (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <br />
          {currectLocation ? (
            <>
              <p>City: {currectLocation.state_district}</p>
              <p>Place: {currectLocation.county}</p>
              <p>State: {currectLocation.state}</p>
              <p>Country: {currectLocation.country}</p>
              <p>Country Code: {currectLocation.country_code}</p>

              <p>PIN: {currectLocation.postcode}</p>
              <p>State Code: {currectLocation.state_code}</p>
              <p>TimeZone: {currectLocation.timezone?.name}</p>
            </>
          ) : (
            <p>Location data unavailable...</p>
          )}
        </>
      )}
    </div>
  );
};

export default GeoLocation;

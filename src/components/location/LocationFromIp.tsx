import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationFromIP = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setLocation(response.data);
      } catch (err) {
        setError("Failed to fetch location data");
        console.error(err);
      }
    };

    fetchLocation();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Location:</h2>
      <p>IP: {location.ip}</p>
      <p>City: {location.city}</p>
      <p>Region: {location.region}</p>
      <p>Country: {location.country_name}</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default LocationFromIP;

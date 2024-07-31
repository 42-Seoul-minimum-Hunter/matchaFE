import React, { useEffect, useState } from "react";

// ip로 경도 위도 찾기
// useEffect(() => {
//   async function getClientIP() {
//     try {
//       const response = await axios.get("https://api64.ipify.org?format=json");
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getClientIP();
// }, []);

// 경도 위도로 주소 찾기 -> ip로 경도,위도 얻고 찾을 때 사용
const LocationFromCoords = ({ latitude, longitude }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Location Info:", data);
        setLocation(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  }, [latitude, longitude]);

  if (error) return <div>Error: {error.message}</div>;
  if (!location) return <div>Loading...</div>;

  return (
    <div>
      <h2>Location Information</h2>
      <p>Address: {location.display_name}</p>
      <p>Country: {location.address.country}</p>
      <p>State/Province: {location.address.state}</p>
      <p>
        City:{" "}
        {location.address.city ||
          location.address.town ||
          location.address.village}
      </p>
      <p>Postcode: {location.address.postcode}</p>
      <p>Road: {location.address.road}</p>
    </div>
  );
};

export default LocationFromCoords;

const test = () => {
  var startPos;
  var geoSuccess = function (position) {
    startPos = position;
    console.log("Latitude:", startPos.coords.latitude);
    console.log("Longitude:", startPos.coords.longitude);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, function (error) {
    console.error("Error occurred. Error code: " + error.code);
  });
};

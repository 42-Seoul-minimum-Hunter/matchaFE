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
interface LocationFromCoordsProps {
  latitude: number;
  longitude: number;
  onLocationFound: (si: string, gu: string) => void;
}

const LocationFromCoords: React.FC<LocationFromCoordsProps> = ({
  latitude,
  longitude,
  onLocationFound,
}) => {
  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Location Info:", data);
        const si = data.address.state || data.address.city;
        const gu = data.address.county || data.address.city_district;
        if (si && gu) {
          onLocationFound(si, gu);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [latitude, longitude, onLocationFound]);

  return null;
};

export default LocationFromCoords;

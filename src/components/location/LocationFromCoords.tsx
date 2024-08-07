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

// 브라우저 위치 라이브러리 사용 허가
// const test = () => {
//   var startPos;
//   var geoSuccess = function (position) {
//     startPos = position;
//     console.log("Latitude:", startPos.coords.latitude);
//     console.log("Longitude:", startPos.coords.longitude);
//   };
//   navigator.geolocation.getCurrentPosition(geoSuccess, function (error) {
//     console.error("Error occurred. Error code: " + error.code);
//   });
// };

// const test = () => {
//   var geoSuccess = function (position: GeolocationPosition) {
//     console.log("Latitude:", position.coords.latitude);
//     console.log("Longitude:", position.coords.longitude);
//     setGeoLocationError(null);
//   };

//   var geoError = function (error: GeolocationPositionError) {
//     console.error("Error occurred. Error code: " + error.code);
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         setGeoLocationError("위치 정보 접근 권한이 거부되었습니다.");
//         break;
//       case error.POSITION_UNAVAILABLE:
//         setGeoLocationError("위치 정보를 사용할 수 없습니다.");
//         break;
//       case error.TIMEOUT:
//         setGeoLocationError("위치 정보 요청 시간이 초과되었습니다.");
//         break;
//       default:
//         setGeoLocationError("알 수 없는 오류가 발생했습니다.");
//     }
//   };

//   if (isGpsAllowed) {
//     navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//   }
// };

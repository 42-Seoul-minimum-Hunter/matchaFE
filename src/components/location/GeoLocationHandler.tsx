// import { useEffect, useState } from "react";
// import Loading from "../chat/Loading";

// interface GeoLocationHandlerProps {
//   isGpsAllowed: boolean;
//   refreshLocation: boolean;
//   onGeoLocationError: (error: string) => void;
//   onAddressFound: (si: string, gu: string) => void;
//   onRefreshComplete: () => void;
// }

// const GeoLocationHandler: React.FC<GeoLocationHandlerProps> = ({
//   isGpsAllowed,
//   refreshLocation,
//   onGeoLocationError,
//   onAddressFound,
//   onRefreshComplete,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (refreshLocation) {
//       setIsLoading(true);
//       if (isGpsAllowed) {
//         getLocationByGPS();
//       } else {
//         getLocationByIP();
//       }
//     }
//   }, [isGpsAllowed, refreshLocation]);

//   const getLocationByGPS = () => {
//     const geoSuccess = (position: GeolocationPosition) => {
//       const { latitude, longitude } = position.coords;
//       // onGeoLocationSuccess(latitude, longitude);
//       fetchAddress(latitude, longitude);
//     };

//     const geoError = (error: GeolocationPositionError) => {
//       handleLocationError("GPS 위치 확인 실패: " + error.message);
//     };

//     navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//   };

//   const getLocationByIP = async () => {
//     try {
//       const ipResponse = await fetch("https://api64.ipify.org?format=json");
//       const ipData = await ipResponse.json();
//       console.log("Your Public IP Address:", ipData.ip);

//       const locationResponse = await fetch(
//         `https://ipapi.co/${ipData.ip}/json/`
//       );
//       const locationData = await locationResponse.json();

//       if (locationData.error) {
//         throw new Error(locationData.reason);
//       }

//       // onGeoLocationSuccess(locationData.latitude, locationData.longitude);
//       onAddressFound(locationData.region, locationData.city);
//     } catch (error) {
//       handleLocationError(
//         "IP 기반 위치 확인 실패: " + (error as Error).message
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchAddress = async (latitude: number, longitude: number) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//       );
//       const data = await response.json();
//       const si = data.address.province || data.address.city;
//       const gu =
//         data.address.borough ||
//         data.address.city_district ||
//         data.address.town ||
//         data.address.village;
//       onAddressFound(si, gu);
//     } catch (error) {
//       handleLocationError("주소 변환 실패");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLocationError = (errorMessage: string) => {
//     setIsLoading(false);
//     onGeoLocationError(errorMessage);
//     onRefreshComplete();
//   };

//   useEffect(() => {
//     if (!isLoading) {
//       onRefreshComplete();
//     }
//   }, [isLoading]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return null;
// };

// export default GeoLocationHandler;

import React, { useEffect, useState } from "react";
import Loading from "../chat/Loading";

interface GeoLocationHandlerProps {
  isGpsAllowed: boolean;
  onGeoLocationError: (error: string) => void;
  onAddressFound: (si: string, gu: string) => void;
}

const GeoLocationHandler: React.FC<GeoLocationHandlerProps> = ({
  isGpsAllowed,
  onGeoLocationError,
  onAddressFound,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isGpsAllowed) {
      getLocationByGPS();
    } else {
      getLocationByIP();
    }
  }, [isGpsAllowed]);

  const getLocationByGPS = () => {
    const geoSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchAddress(latitude, longitude);
    };

    const geoError = (error: GeolocationPositionError) => {
      handleLocationError("GPS 위치 확인 실패: " + error.message);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };

  const getLocationByIP = async () => {
    try {
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();

      const locationResponse = await fetch(
        `https://ipapi.co/${ipData.ip}/json/`
      );
      const locationData = await locationResponse.json();

      if (locationData.error) {
        throw new Error(locationData.reason);
      }

      onAddressFound(locationData.region, locationData.city);
    } catch (error) {
      handleLocationError(
        "IP 기반 위치 확인 실패: " + (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const si = data.address.province || data.address.city;
      const gu =
        data.address.borough ||
        data.address.city_district ||
        data.address.town ||
        data.address.village;
      onAddressFound(si, gu);
    } catch (error) {
      handleLocationError("주소 변환 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationError = (errorMessage: string) => {
    setIsLoading(false);
    onGeoLocationError(errorMessage);
  };

  if (isLoading) {
    return <Loading />;
  }

  return null;
};

export default GeoLocationHandler;

import { useState, useCallback } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);

  const getLocation = useCallback(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    setAsking(true);
    setError(null);

    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });
      setAsking(false);
    };

    const handleError = (err: GeolocationPositionError) => {
      setAsking(false);
      if (err.code === err.TIMEOUT) {
        setError(
          "위치 정보를 가져오는 데 시간이 초과되었습니다. 다시 시도해 주세요."
        );
      } else if (err.code === err.PERMISSION_DENIED) {
        setError("위치 정보 제공 권한이 거부되었습니다.");
      } else {
        setError(err.message);
      }
    };

    const options = {
      enableHighAccuracy: false, // 높은 정확도 비활성화
      timeout: 10000, // 타임아웃을 10초로 증가
      maximumAge: 60000, // 1분 이내의 캐시된 위치 허용
    };

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error, asking, getLocation };
};

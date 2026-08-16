"use client";

import { useCallback, useState } from "react";

const STATUS = {
  IDLE: "idle",
  LOCATING: "locating",
  SUCCESS: "success",
  ERROR: "error",
};

export function useGeolocation() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [coords, setCoords] = useState(null); // { lat, lng, accuracy }
  const [error, setError] = useState(null);

  const locate = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setStatus(STATUS.ERROR);
      setError("Your browser doesn't support geolocation.");
      return;
    }

    setStatus(STATUS.LOCATING);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setStatus(STATUS.SUCCESS);
      },
      (err) => {
        let message = "Something went wrong while finding your location.";
        if (err.code === err.PERMISSION_DENIED) {
          message =
            "Location access was denied. Allow location permission in your browser to use the map.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Your location is currently unavailable. Try again in a moment.";
        } else if (err.code === err.TIMEOUT) {
          message = "Finding your location took too long. Try again.";
        }
        setError(message);
        setStatus(STATUS.ERROR);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, []);

  const reset = useCallback(() => {
    setStatus(STATUS.IDLE);
    setCoords(null);
    setError(null);
  }, []);

  return {
    status,
    coords,
    error,
    locate,
    reset,
    isLocating: status === STATUS.LOCATING,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR,
  };
}

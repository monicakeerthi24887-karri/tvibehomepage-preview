import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function useLocationTracker(enabled = true) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Ping location to backend every 30 seconds if position changes
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        
        // Log to backend
        try {
          await api.request('/analytics/location', {
            method: 'POST',
            body: JSON.stringify({
              lat: latitude,
              lng: longitude,
              accuracy: accuracy
            })
          });
        } catch (err) {
          console.error("Failed to ping location", err);
        }
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { location, error };
}

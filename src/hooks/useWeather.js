import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Coordenadas de Lisboa: 38.72°N, -9.14°W
const LISBON_LAT = 38.72;
const LISBON_LON = -9.14;
const API_URL = 'https://api.open-meteo.com/v1/forecast';

const useWeather = (refreshInterval = 600000) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, {
        params: {
          latitude: LISBON_LAT,
          longitude: LISBON_LON,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility,pressure_msl,is_day',
          hourly: 'precipitation_probability,wind_speed_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
          timezone: 'Europe/Lisbon',
        },
      });

      const current = response.data.current;
      const daily = response.data.daily;

      setWeather({
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: current.wind_direction_10m,
        visibility: current.visibility,
        pressure: current.pressure_msl,
        weatherCode: current.weather_code,
        isDay: current.is_day,
        precipitation: current.precipitation,
        time: current.time,
        daily: {
          maxTemp: Math.round(daily.temperature_2m_max[0]),
          minTemp: Math.round(daily.temperature_2m_min[0]),
          precipitation: daily.precipitation_sum[0],
          windSpeed: Math.round(daily.wind_speed_10m_max[0]),
        },
      });

      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados do tempo:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch inicial
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Auto-refresh a cada intervalo especificado (padrão: 10 minutos)
  useEffect(() => {
    const interval = setInterval(fetchWeather, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchWeather, refreshInterval]);

  const manualRefresh = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    loading,
    error,
    lastUpdate,
    refresh: manualRefresh,
  };
};

export default useWeather;

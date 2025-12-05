import React from 'react';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Gauge,
} from 'lucide-react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ weather, loading, error }) => {
  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="spinner"></div>
        <p>Carregando dados do tempo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card error">
        <p>Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  if (!weather) {
    return <div className="weather-card">Nenhum dado disponível</div>;
  }

  const getWeatherIcon = (code, isDay) => {
    // WMO Weather Codes
    if (code === 0 || code === 1) {
      return <Sun className="weather-icon sunny" size={64} />;
    }
    if (code === 2) {
      return <Cloud className="weather-icon partly-cloudy" size={64} />;
    }
    if (code === 3) {
      return <Cloud className="weather-icon cloudy" size={64} />;
    }
    if (code >= 45 && code <= 48) {
      return <Cloud className="weather-icon foggy" size={64} />;
    }
    if (code >= 51 && code <= 67) {
      return <CloudRain className="weather-icon rainy" size={64} />;
    }
    if (code >= 71 && code <= 85) {
      return <CloudRain className="weather-icon snowy" size={64} />;
    }
    if (code >= 80 && code <= 82) {
      return <CloudRain className="weather-icon rainy" size={64} />;
    }
    if (code >= 85 && code <= 86) {
      return <CloudRain className="weather-icon snowy" size={64} />;
    }
    if (code >= 80 && code <= 99) {
      return <CloudRain className="weather-icon stormy" size={64} />;
    }
    return <Cloud className="weather-icon" size={64} />;
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Céu limpo',
      1: 'Principalmente céu limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Nevoeiro',
      48: 'Nevoeiro depositado',
      51: 'Chuva leve',
      53: 'Chuva moderada',
      55: 'Chuva pesada',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva pesada',
      71: 'Neve leve',
      73: 'Neve moderada',
      75: 'Neve pesada',
      80: 'Chuva leve dispersa',
      81: 'Chuva moderada dispersa',
      82: 'Chuva pesada dispersa',
      85: 'Neve leve dispersa',
      86: 'Neve pesada dispersa',
      95: 'Tempestade thunderstorm',
      96: 'Tempestade com granizo leve',
      99: 'Tempestade com granizo pesado',
    };
    return descriptions[code] || 'Desconhecido';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Lisboa, Portugal</h2>
        <p className="timestamp">
          Atualizado em: {new Date(weather.time).toLocaleTimeString('pt-PT')}
        </p>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          {getWeatherIcon(weather.weatherCode, weather.isDay)}
        </div>
        <div className="weather-info">
          <div className="temperature">
            <span className="temp-value">{weather.temperature}°</span>
            <span className="temp-unit">C</span>
          </div>
          <p className="description">{getWeatherDescription(weather.weatherCode)}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-header">
            <Wind size={20} />
            <span>Vento</span>
          </div>
          <span className="detail-value">{weather.windSpeed} km/h</span>
        </div>

        <div className="detail-item">
          <div className="detail-header">
            <Droplets size={20} />
            <span>Humidade</span>
          </div>
          <span className="detail-value">{weather.humidity}%</span>
        </div>

        <div className="detail-item">
          <div className="detail-header">
            <Eye size={20} />
            <span>Visibilidade</span>
          </div>
          <span className="detail-value">{weather.visibility / 1000} km</span>
        </div>

        <div className="detail-item">
          <div className="detail-header">
            <Gauge size={20} />
            <span>Pressão</span>
          </div>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

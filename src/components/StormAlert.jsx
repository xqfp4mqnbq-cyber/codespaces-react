import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import '../styles/StormAlert.css';

const StormAlert = ({ weather }) => {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    const newAlerts = [];

    if (!weather) return;

    // Verificar velocidade do vento (Tempestade se > 50 km/h, Aviso se > 40 km/h)
    if (weather.windSpeed > 50) {
      newAlerts.push({
        id: 'wind-extreme',
        type: 'danger',
        title: '⚠️ ALERTA DE VENTO EXTREMO',
        message: `Velocidade do vento: ${weather.windSpeed} km/h - Risco elevado!`,
      });
    } else if (weather.windSpeed > 40) {
      newAlerts.push({
        id: 'wind-warning',
        type: 'warning',
        title: '⚡ Aviso de Vento Forte',
        message: `Velocidade do vento: ${weather.windSpeed} km/h`,
      });
    }

    // Verificar chuva intensa (códigos WMO para chuva pesada)
    if ([65, 82, 99].includes(weather.weatherCode)) {
      newAlerts.push({
        id: 'heavy-rain',
        type: 'warning',
        title: '🌧️ Chuva Intensa',
        message: 'Chuva pesada prevista. Tenha cuidado em áreas de drenagem.',
      });
    }

    // Verificar tempestades (códigos WMO 80-99)
    if ([95, 96, 99].includes(weather.weatherCode)) {
      newAlerts.push({
        id: 'thunderstorm',
        type: 'danger',
        title: '⛈️ ALERTA DE TEMPESTADE',
        message: 'Tempestade com raios prevista. Procure abrigo imediatamente!',
      });
    }

    // Verificar visibilidade reduzida (neblina/nevoeiro)
    if (weather.visibility < 1000) {
      newAlerts.push({
        id: 'low-visibility',
        type: 'warning',
        title: '🌫️ Visibilidade Reduzida',
        message: `Visibilidade: ${weather.visibility / 1000} km`,
      });
    }

    setAlerts(newAlerts);
  }, [weather]);

  const handleDismiss = (alertId) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(alertId);
    setDismissed(newDismissed);
  };

  const visibleAlerts = alerts.filter((alert) => !dismissed.has(alert.id));

  if (visibleAlerts.length === 0) {
    return (
      <div className="storm-alert-container">
        <div className="no-alerts">
          <div className="checkmark">✓</div>
          <p>Nenhum alerta ativo. Condições normais em Lisboa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="storm-alert-container">
      {visibleAlerts.map((alert) => (
        <div key={alert.id} className={`storm-alert ${alert.type}`}>
          <div className="alert-content">
            <div className="alert-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="alert-text">
              <h3>{alert.title}</h3>
              <p>{alert.message}</p>
            </div>
          </div>
          <button
            className="dismiss-btn"
            onClick={() => handleDismiss(alert.id)}
            aria-label="Fechar alerta"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default StormAlert;

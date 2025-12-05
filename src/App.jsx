import './App.css';
import { RefreshCw } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import StormAlert from './components/StormAlert';
import useWeather from './hooks/useWeather';

function App() {
  const { weather, loading, error, lastUpdate, refresh } = useWeather(600000); // Atualiza a cada 10 minutos

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>⛈️ Monitor de Tempo - Lisboa</h1>
            <p className="subtitle">Monitoramento de Tempo e Tempestades em Tempo Real</p>
          </div>
          <button
            className="refresh-btn"
            onClick={refresh}
            disabled={loading}
            title="Atualizar dados"
          >
            <RefreshCw size={20} className={loading ? 'spinning' : ''} />
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
        </header>

        <main className="app-main">
          <StormAlert weather={weather} />
          <WeatherCard weather={weather} loading={loading} error={error} />

          {lastUpdate && (
            <div className="last-update">
              <p>
                Última atualização:{' '}
                <strong>
                  {lastUpdate.toLocaleTimeString('pt-PT', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </strong>
              </p>
              <p className="next-update">
                Próxima atualização automática em 10 minutos
              </p>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>Dados fornecidos por Open-Meteo API</p>
          <p className="footer-note">
            Este aplicativo fornece informações meteorológicas em tempo real para a cidade de
            Lisboa, Portugal.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

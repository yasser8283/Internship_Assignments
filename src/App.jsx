import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      // Geocode the city name to get coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
      )
      
      if (!geoResponse.ok) {
        throw new Error('Failed to fetch city data')
      }

      const geoData = await geoResponse.json()
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please try another city.`)
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // Fetch weather data using coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`
      )

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const weatherData = await weatherResponse.json()
      
      setWeather({
        city: name,
        country: country,
        temperature: Math.round(weatherData.current.temperature_2m),
        apparentTemperature: Math.round(weatherData.current.apparent_temperature),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        weatherCode: weatherData.current.weather_code,
        description: getWeatherDescription(weatherData.current.weather_code)
      })
      setCity(cityName)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  // Get weather description based on WMO weather code
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing Rime Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Slight Hail',
      99: 'Thunderstorm with Heavy Hail'
    }
    return weatherCodes[code] || 'Unknown'
  }

  // Get emoji based on weather condition
  const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️'
    if (code === 1 || code === 2) return '⛅'
    if (code === 3) return '☁️'
    if (code === 45 || code === 48) return '🌫️'
    if (code >= 51 && code <= 67) return '🌧️'
    if (code >= 71 && code <= 86) return '❄️'
    if (code >= 95) return '⛈️'
    return '🌤️'
  }

  // Fetch weather on mount
  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim())
      setSearchInput('')
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>⛅ Weather Dashboard</h1>
      </header>

      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      <main className="main-content">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => fetchWeather('London')} 
              className="retry-btn"
            >
              Try Again with Default City
            </button>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.city}, {weather.country}</h2>
            </div>

            <div className="weather-main">
              <div className="temperature-section">
                <div className="temp-display">
                  <span className="weather-emoji">{getWeatherEmoji(weather.weatherCode)}</span>
                  <span className="temperature">{weather.temperature}°C</span>
                </div>
                <p className="weather-description">{weather.description}</p>
                <p className="feels-like">Feels like {weather.apparentTemperature}°C</p>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <div className="detail-info">
                    <p className="detail-label">Humidity</p>
                    <p className="detail-value">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💨</span>
                  <div className="detail-info">
                    <p className="detail-label">Wind Speed</p>
                    <p className="detail-value">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => fetchWeather(city)} 
              className="refresh-btn"
            >
              🔄 Refresh
            </button>
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="empty-state">
            <p>Search for a city to see its weather</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Weather data provided by Open-Meteo | © 2024 Weather Dashboard</p>
      </footer>
    </div>
  )
}

export default App

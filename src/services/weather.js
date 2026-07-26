const API_KEY = 'demo'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const DEMO_WEATHER = {
  location: 'Kaveripattinam',
  current: {
    temp: 28,
    feelsLike: 31,
    humidity: 65,
    windSpeed: 12,
    windDir: 'SW',
    description: 'Partly Cloudy',
    icon: '🌤',
    rainChance: 40,
    uvIndex: 6,
    pressure: 1012,
    visibility: 10,
  },
  forecast: [
    { day: 'Mon', temp: 28, icon: '🌤', humidity: 65, rain: 20 },
    { day: 'Tue', temp: 26, icon: '🌧', humidity: 78, rain: 70 },
    { day: 'Wed', temp: 25, icon: '⛈', humidity: 85, rain: 90 },
    { day: 'Thu', temp: 27, icon: '🌤', humidity: 60, rain: 15 },
    { day: 'Fri', temp: 29, icon: '☀️', humidity: 55, rain: 5 },
    { day: 'Sat', temp: 30, icon: '☀️', humidity: 50, rain: 0 },
    { day: 'Sun', temp: 28, icon: '🌤', humidity: 62, rain: 25 },
  ],
  alerts: [
    {
      title: 'Heavy Rain Warning',
      description: 'Heavy rainfall expected on Wednesday. Plan irrigation accordingly.',
      severity: 'moderate',
    },
  ],
  sun: {
    rise: '6:15 AM',
    set: '6:45 PM',
  },
}

const weatherIcons = {
  '01d': '☀️', '01n': '🌙',
  '02d': '🌤', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧', '09n': '🌧',
  '10d': '🌦', '10n': '🌧',
  '11d': '⛈', '11n': '⛈',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫', '50n': '🌫',
}

function formatForecastDay(timestamp) {
  const date = new Date(timestamp * 1000)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[date.getDay()]
}

function mapIcon(code) {
  return weatherIcons[code] || '🌤'
}

export async function fetchWeather(lat = 11.1, lon = 78.88) {
  if (API_KEY === 'demo') {
    return DEMO_WEATHER
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
    ])

    const current = await currentRes.json()
    const forecast = await forecastRes.json()

    const dailyForecasts = forecast.list
      .filter((_, i) => i % 8 === 0)
      .slice(0, 7)
      .map((item) => ({
        day: formatForecastDay(item.dt),
        temp: Math.round(item.main.temp),
        icon: mapIcon(item.weather[0].icon),
        humidity: item.main.humidity,
        rain: Math.round((item.pop || 0) * 100),
      }))

    return {
      location: current.name,
      current: {
        temp: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 3.6),
        windDir: getWindDirection(current.wind.deg),
        description: current.weather[0].description,
        icon: mapIcon(current.weather[0].icon),
        rainChance: Math.round((forecast.list[0]?.pop || 0) * 100),
        uvIndex: 0,
        pressure: current.main.pressure,
        visibility: Math.round((current.visibility || 10000) / 1000),
      },
      forecast: dailyForecasts,
      alerts: [],
      sun: {
        rise: new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        set: new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      },
    }
  } catch {
    return DEMO_WEATHER
  }
}

function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export async function fetchWeatherForecast(lat = 11.1, lon = 78.88) {
  const data = await fetchWeather(lat, lon)
  return data.forecast
}

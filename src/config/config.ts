const OPEN_WEATHER_MAP_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const config = {
  WEATHER_API_ENDPOINT: `https://api.openweathermap.org/data/2.5/weather?appid=${OPEN_WEATHER_MAP_API_KEY}&`,
  WEATHER_DATA_ENDPOINT: `https://api.openweathermap.org/data/2.5/onecall?appid=${OPEN_WEATHER_MAP_API_KEY}&exclude=minutely&units=metric&`,
  UNSPLASH_API: `https://api.unsplash.com/search/photos?page=1&query=`,
};

export default config;

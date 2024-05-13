import { createSlice } from "@reduxjs/toolkit";

export type Daily = {
  dt: number;
  timezone: string;
  weather: { icon: string }[];
  temp: { max: number; min: number };
};

export type Current = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  wind_deg: number;
  wind_speed: number;
};

export type Weather = {
  dt: number;
  timezone: string;
  weather: { icon: string }[];
  temp: { max: number; min: number };
  daily: Daily[];
  current: Current;
};

export type AppState = {
  weather: Weather;
  unit: "C" | "F";
  city: string;
  country: string;
  geoCoords: {
    lon: number;
    lat: number;
  };
};

const initialState = {
  weather: {
    dt: 1715408566,
    timezone: "Asia/Kolkata",
    weather: [{ icon: "" }],
    temp: { max: 0, min: 0 },
    daily: [],
    current: {
      clouds: null,
      dew_point: null,
      dt: 1715408566,
      feels_like: null,
      humidity: null,
      pressure: null,
      sunrise: 0,
      sunset: 0,
      temp: null,
      uvi: null,
      visibility: null,
      weather: [{ id: null, main: "", description: "", icon: "" }],
      wind_deg: null,
      wind_speed: 0,
    },
  },
  unit: "C",
  city: "Delhi",
  country: "IN",
  geoCoords: {
    lon: 77.2167,
    lat: 28.6667,
  },
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload.payload;
    },
    setGeoCoordinates: (state, action) => {
      state.geoCoords = action.payload.payload;
    },
  },
});

export const { setWeather, setCity, setCountry, setUnit, setGeoCoordinates } =
  appStateSlice.actions;
export default appStateSlice.reducer;

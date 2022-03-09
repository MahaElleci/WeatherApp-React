import { Coordinates } from "../models/Weather";

const URL = "https://api.openweathermap.org/data/2.5/weather?";

export const getWeather = (coordinates: Coordinates, unit: string) => {
  return fetch(
    `${URL}lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
};

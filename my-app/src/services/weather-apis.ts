import { Coordinates } from "../models/Weather";

const URL = "https://api.openweathermap.org/data/2.5/weather?"

export const getWeather =  (coordinates: Coordinates) =>  {
    return  fetch(`${URL}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=fd6032279a0003deb02c6f7ac93e8423`);
};
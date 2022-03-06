export interface Coordinates {
  lon: number;
  lat: number;
}

export interface MainWeatherConditions {
  id: number; 
  location:  string,
  main: string;
  icon: string; 
  temp: number;
}


export interface WeatherDetails{
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
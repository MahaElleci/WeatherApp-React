export interface Coordinates {
  lon: number;
  lat: number;
}


export interface WeatherDetailsData{
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number; 
} 

export interface MainWeatherConditions {
  id: number; 
  location:  string,
  main: string;
  icon: string; 
  temp: number;  
  details: WeatherDetailsData; 
  sys: object;
}


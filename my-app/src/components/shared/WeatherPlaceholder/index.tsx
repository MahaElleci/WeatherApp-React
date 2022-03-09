import { FC } from "react";
import { WeatherDetailsData } from "../../../models/Weather";

import { Link } from "react-router-dom";
import "./styles.scss";

interface IProps {
  id: number;
  location: string;
  temprature: number;
  icon: string;
  main: string;
  details: WeatherDetailsData;
  sys: object; 
  unit: string;
}

export const WeatherPlaceholder: FC<IProps> = ({
  id,
  location,
  temprature,
  icon,
  main,
  details,
  sys, 
  unit
}) => {
  const detailsObj = {
    tempDetails: details,
    timings: sys,
    condition: main,
  };
  return (
    <Link
      to={`/details/${id}`}
      state={{ locationName: location, details: detailsObj, icon: icon, unit:unit }}
      className="weather-placeholder" 
      data-testid="weather-element" 
    >
      <p>{location}</p>
      <div id="icon">
        <img id="wicon" src={icon} alt="Weather icon" />
      </div>
      <div className="weather-placeholder__temp">
        <span>{temprature} {unit === "metric" ? "°C" : "°F"}</span>
        <span>{main}</span>
      </div>
    </Link>
  );
};

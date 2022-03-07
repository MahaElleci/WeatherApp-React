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
}

export const WeatherPlaceholder: FC<IProps> = ({
  id,
  location,
  temprature,
  icon,
  main,
  details,
  sys,
}) => {
  const detailsObj = {
    tempDetails: details,
    timings: sys,
    condition: main,
  };
  return (
    <Link
      to={`/details/${id}`}
      state={{ locationName: location, details: detailsObj, icon: icon }}
      className="weather-placeholder"
    >
      <p>{location}</p>
      <div id="icon">
        <img id="wicon" src={icon} alt="Weather icon" />
      </div>
      <div className="weather-placeholder__temp">
        <span>{temprature} C°</span>
        <span>{main}</span>
      </div>
    </Link>
  );
};

import { FC } from "react";
import { useLocation } from "react-router-dom";

import { WeatherDetailsData } from "../../../models/Weather";
import "./styles.scss";
interface IWeatherDetailsProps {}
interface LocationState {
  to: string;
  state: {
    locationName: string;
    details: {
      tempDetails: WeatherDetailsData;
      timings: {
        sunrise: number;
        sunset: number;
      };
      condition: string;
    };
    icon: string;
  };
}

export const WeatherDetails: FC<IWeatherDetailsProps> = () => {
  const location = useLocation() as unknown as LocationState;
  const { locationName, details, icon } = location.state;

  const convertToTime = (s: number) => {
    var date = new Date(s * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  };
  return (
    <div className="weatherDetails-wrapper">
      <h3>{locationName}</h3>
      <div className="weatherDetails-wrapper__info">
        <div className="weatherDetails-wrapper__info__temp">
          <span className="condition">
            {details.condition} <img id="wicon" src={icon} alt="Weather icon" />
          </span>
          <span className="temprature">
            {Math.ceil(details.tempDetails.temp)} C°
          </span>
          <div className="hi-lo-temprature">
            <span>Lowest: {Math.ceil(details.tempDetails.temp_min)} C°</span>
            <span>Heighest: {Math.ceil(details.tempDetails.temp_max)} C°</span>
          </div>
        </div>

        <div className="weatherDetails-wrapper__info__details">
          <div>
            <span>Humidity</span>
            <p>{details.tempDetails.humidity} %</p>
          </div>
          <div>
            <span>Pressure</span>
            <p>{details.tempDetails.pressure} hPa</p>
          </div>
          <div>
            <span>Sunrise</span>
            <p>{convertToTime(details.timings.sunrise)}</p>
          </div>
          <div>
            <span>Sunset</span>
            <p>{convertToTime(details.timings.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

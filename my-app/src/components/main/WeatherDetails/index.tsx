import { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WeatherDetailsData } from "../../../models/Weather";
import { Spinner } from "../../shared/spinner";
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
    unit :string;
  };
}

export const WeatherDetails: FC<IWeatherDetailsProps> = () => {
  const location = useLocation() as unknown as LocationState;
  const navigate = useNavigate();
  const { locationName, details, icon, unit } = location.state;
  const [loading, setLoading] = useState(true);

  const convertToTime = (s: number) => {
    var date = new Date(s * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  return (
    <div className="weatherDetails-wrapper">
      <h3>{locationName}</h3> 

      <div className="back-btn" onClick={() => navigate("/")}></div>
      <div className="weatherDetails-wrapper__info">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="weatherDetails-wrapper__info__temp">
              <span className="condition">
                {details.condition}{" "}
                <img id="wicon" src={icon} alt="Weather icon" />
              </span>
              <span className="temprature">
                {Math.ceil(details.tempDetails.temp)} {unit === "metric" ? "°C" : "°F"}
              </span>
              <div className="hi-lo-temprature">
                <span>
                  Lowest: {Math.ceil(details.tempDetails.temp_min)} {unit === "metric" ? "°C" : "°F"}
                </span>
                <span>
                  Heighest: {Math.ceil(details.tempDetails.temp_max)} {unit === "metric" ? "°C" : "°F"}
                </span>
              </div>
            </div>

            <div className="weatherDetails-wrapper__info__details">
              <div>
                <span>Humidity </span> 
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
          </>
        )}
      </div>
    </div>
  );
};

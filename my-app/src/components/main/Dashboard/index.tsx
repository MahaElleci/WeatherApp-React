import { FC, useEffect, useState } from "react";

import { WeatherPlaceholder } from "../../shared/WeatherPlaceholder";
import { getWeather } from "../../../services/weather-apis";

import { Spinner } from "../../shared/spinner";
import { MainWeatherConditions } from "../../../models/Weather";
import "./styles.scss";
interface IProps {}

export const Dashboard: FC<IProps> = () => {
  const [locationsWeather, setLocationsWeather] = useState<
    MainWeatherConditions[] | null
  >(null);

  const [loading, setLoading] = useState(true);

  let locations: MainWeatherConditions[] = [];

  const getCurrentLocation = () => {
    let currentLocation = { lon: 0, lat: 0 };
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = {
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      };
    });
    return currentLocation;
  };
  const getDashboardData = () => {
    const requests = [
      { displayName: "My Location", coordinates: getCurrentLocation() },
      {
        displayName: "Berlin",
        coordinates: { lon: 13.404954, lat: 52.520008 },
      },
      { displayName: "Iceland", coordinates: { lon: 19.0208, lat: 64.9631 } },
    ];
    Promise.all(requests.map((request) => getWeather(request.coordinates)))
      .then((responses) => {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => {
        setLoading(false);
        data.forEach((location, index) => {
          locations.push({
            id: location["weather"][0].id,
            location: requests[index].displayName,
            main: location["weather"][0].main,
            temp: Math.ceil(location["main"].temp),
            icon: location["weather"][0].icon,
            details: location["main"],
            sys: location["sys"],
          });
        });
        setLocationsWeather(locations);
      });
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1>"Coolest" 🥶🌡️ Weather App</h1>
      <div className="dashboard-wrapper__locations">
        {loading ? (
          <Spinner />
        ) : (
          locationsWeather &&
          locationsWeather.map((item, index) => {
            var iconurl =
              "http://openweathermap.org/img/w/" + item.icon + ".png";
            return (
              <WeatherPlaceholder
                key={index}
                id={item.id}
                location={item.location}
                temprature={item.temp}
                icon={iconurl}
                main={item.main}
                details={item.details}
                sys={item.sys}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

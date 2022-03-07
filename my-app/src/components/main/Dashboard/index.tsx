import { FC, useEffect, useState } from "react";

import { WeatherPlaceholder } from "../../shared/WeatherPlaceholder";
import { getWeather } from "../../../services/weather-apis";

import { Spinner } from "../../shared/spinner";
import { Coordinates, MainWeatherConditions } from "../../../models/Weather";
import "./styles.scss";
interface IProps {}

export const Dashboard: FC<IProps> = () => {
  const [locationsWeather, setLocationsWeather] = useState<
    MainWeatherConditions[] | null
  >(null);

  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({
    lon: 0,
    lat: 0,
  });
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });

  let locations: MainWeatherConditions[] = [];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
        localStorage.setItem("authorizedGeoLocation", "true");
      },
      () => {
        localStorage.setItem("authorizedGeoLocation", "false");
      }
    );
  };

  const nonAuthorizedLocation = () => {
    if (
      typeof localStorage.getItem("authorizedGeoLocation") == "undefined" ||
      localStorage.getItem("authorizedGeoLocation") == "false"
    ) {
      return true;
    } else return false;
  };
  const getDashboardData = () => {
    setLoading(true);
    const requests = [
      {
        displayName: "My Location",
        coordinates: currentLocation,
      },
      {
        displayName: "Berlin",
        coordinates: { lon: 13.404954, lat: 52.520008 },
      },
      { displayName: "Iceland", coordinates: { lon: 19.0208, lat: 64.9631 } },
    ];
    Promise.all(requests.map((request) => getWeather(request.coordinates)))
      .then((responses) => {
        return Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              const error = response.status;
              return Promise.reject(error);
            }
            return response.json();
          })
        );
      })
      .then((data) => {
        setLoading(false);
        setErrorMessage({
          show: false,
          message: "",
        });
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
      })
      .catch((error) => {
        setLoading(false);
        if (!errorMessage.show) {
          if (error === 401)
            setErrorMessage({
              show: true,
              message:
                "Unauthorized access. Please check your OpenWeather key.",
            });
          else if (error === 429)
            setErrorMessage({
              show: true,
              message: "You exceeded number of requests to OpenWeather.",
            });
          else
            setErrorMessage({
              show: true,
              message: "Sorry there is a network issue ...",
            });
        }
      });
  };
  useEffect(() => {
    getCurrentLocation();
    nonAuthorizedLocation()
      ? setErrorMessage({
          show: true,
          message:
            "Please enable browser's location service and refresh the page",
        })
      : getDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1>"Coolest" 🥶🌡️ Weather App</h1>
      <div className="dashboard-wrapper__locations">
        {loading ? (
          <Spinner />
        ) : (
          !nonAuthorizedLocation() &&
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
        {errorMessage.show && (
          <div className="error-message">
            <i className="material-icons">&#xe001;</i>
            {errorMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

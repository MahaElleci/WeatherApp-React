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
  const [selectedUnit, setSelectedUnit] = useState("metric");
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({
    lon: 0,
    lat: 0,
  });
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: ""
  });

  let locations: MainWeatherConditions[] = [];
  
  const dashboardRequests = [
    {
      displayName: "My Location",
      coordinates: currentLocation,
    },
    {
      displayName: "Berlin",
      coordinates: { lon: 13.404954, lat: 52.520008 },
    },
    { displayName: "Reykjavík", coordinates: { lon: 19.0208, lat: 64.9631 } },
  ]; 

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
  const getDashboardData = (isCancelled: boolean, unit: string) => {
    setLoading(true);
    Promise.all(dashboardRequests.map((request) => getWeather(request.coordinates, unit)))
      .then((responses) => {
        return Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              const error = response.status;
              return Promise.reject(error);
            } 
            if (!isCancelled)
            return response.json();
          })
        );
      })
      .then((data) => {
        setLoading(false); 
        if (!isCancelled){
        setErrorMessage({
          show: false,
          message: ""
        });
        data.forEach((location, index) => {
          locations.push({
            id: location["weather"][0].id,
            location: dashboardRequests[index].displayName,
            main: location["weather"][0].main,
            temp: Math.ceil(location["main"].temp),
            icon: location["weather"][0].icon,
            details: location["main"],
            sys: location["sys"],
          });
        }); 
        setLocationsWeather(locations); 
      } 
      }) 
    
      .catch((error) => {
        setLoading(false); 
        if (!errorMessage.show && !isCancelled) {
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
    let isCancelled = false; 
    getCurrentLocation();
    nonAuthorizedLocation()
      ? setErrorMessage({
          show: true,
          message:
            "Please enable browser's location service and refresh the page.",
        })
      : getDashboardData(isCancelled, selectedUnit)
      return () => {
        isCancelled = true;
      }; 
    
  }, [selectedUnit]);

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
      <div className="dashboard-wrapper__switcher"> 
           <span>Switch Unit</span> 
           <button className={selectedUnit === "standard" ? "btn btn--active" : "btn"} onClick={() => setSelectedUnit("standard")}>Standard</button> 
           <button className={selectedUnit === "metric" ? "btn btn--active" : "btn"}  onClick={() => setSelectedUnit("metric")}> Metric</button>
            </div>
    </div>
  );
};

import { FC } from "react"; 
import "./styles.scss"; 

interface IProps { 
    location: string, 
    temprature: number, 
    icon: string
}

export const WeatherPlaceholder: FC<IProps> = ({location, temprature, icon}) => { 

  return (
    <div className="weather-placeholder">
        <p>{location}</p> 
        <div id="icon"><img id="wicon" src={icon} alt="Weather icon"/></div> 
        <p>{temprature}</p> 
    </div>
  );
};
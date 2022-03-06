import { FC } from "react";

import "./styles.scss";
interface IProps {}

export const Dashboard: FC<IProps> = () => {
  return (
    <div className="dashboard-wrapper">
      <h1>"Coolest" 🥶🌡️ Weather App</h1>
    </div>
  );
};

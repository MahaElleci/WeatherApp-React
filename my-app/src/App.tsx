import { Dashboard } from "./components/main/Dashboard";
import { WeatherDetails } from "./components/main/WeatherDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details/:id" element={<WeatherDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

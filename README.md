# WeatherApp-React

### Features List : 
- [X] Display basic weather info for 2 default cities (Berlin, Rekyavik) fetched from OpenWeather API on a Dashboard page. 
- [X] If user allowing location service on browser, save user's location and fetch weather details for user's location, display it on Dashboard page.
- [X] If user does not allow location service on browser, show a descriptive error message. 
- [X] Each location weather displayed in Dashboard page is clickable and redirects to the /details page.  
- [X] Dashboard page has a unit switcher that displays temprature unit based on user selection
- [X] Details page displays: selected location name and detailed weather info (Lowest temprature, Heighest temprature, Humidity, Pressure, Sunset and Sunrise timings). 
- [X] Details page has a back button than navigates back to Dashboard page. 
- [X] Spinner shows up when fetching data ONCE in the Dashboard page. 
- [X] Simulation of loading data on WeatherDetails (/details) page is done by showing a Spinner for 800 ms before showing the data.  
- [X] Error handling for : disabled location service, problem with OpenWeather API key, consumption of OpenWeather API hits and any other network problems. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

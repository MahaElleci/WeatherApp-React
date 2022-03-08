import React from "react";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react"; 

import { MemoryRouter } from "react-router-dom";
import { Dashboard } from "./components/main/Dashboard"; 
import { act } from 'react-dom/test-utils';
import { WeatherDetails } from "./components/main/WeatherDetails";

//test if dashboard page renders as expected
test("Renders weather app", () => {
  render(<Dashboard />);
  const pageTitle = screen.getByText(/"Coolest" 🥶🌡️ Weather App/i);
  expect(pageTitle).toBeInTheDocument();
});



//test if api returns default cities
afterEach(cleanup)
it("API returns default cities", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByText("Berlin")).toBeInTheDocument();
    expect(getByText("Iceland")).toBeInTheDocument();
  });
}); 

// test('full app rendering/navigating', () => {
//  render(
//     <MemoryRouter >
//       <Dashboard />
//     </MemoryRouter>,
//   )
//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/"Coolest" 🥶🌡️ Weather App/i)).toBeInTheDocument() 

//   act(() => {
//     const link = screen.getByTestId('weather-element');
 
//     fireEvent.click(link);
//   });


//   // check that the content changed to the new page
//   expect(screen.getByText(/Weather Details/i)).toBeInTheDocument()
// })

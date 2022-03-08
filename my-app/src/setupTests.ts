// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//mocking gelocation property
Object.defineProperty(global.navigator, 'geolocation', {value: {}})  
Object.defineProperty(global.navigator.geolocation, 'getCurrentPosition', {value: jest.fn()}) 

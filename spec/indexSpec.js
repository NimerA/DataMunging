const index = require('../src/index.js');

const footballDatam = index.footballData;
const weatherDatam = index.weatherData;

describe('when using weather data munging', () => {
  it('using ./weather.dat', () => {
    expect(weatherDatam('./weather.dat')).toBe('Day: 14 Max Temp: 61 Min Temp: 59');
  });
});

describe('when using football data munging', () => {
  it('using ./football.dat', () => {
    expect(footballDatam('./football.dat')).toBe('Name: Aston_Villa Smallest difference: 1');
  });
});

import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: string;
  windSpeed: string;
  humidity: string;

  constructor(city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: string,
    windSpeed: string,
    humidity: string,) {
      this.city = city
      this.date = date;
      this.icon = icon;
      this.iconDescription = iconDescription;
      this.tempF = tempF;
      this.windSpeed = windSpeed;
      this.humidity = humidity
    }
}
// TODO: Complete the WeatherService class

//can I take these arguements out?

class WeatherService {
  baseURL: string;
  APIkey: string;
  cityName: string;

  constructor(
    baseURL: string,
    APIkey: string,
    cityName: string,) {
      this.baseURL = baseURL;
      this.APIkey = APIkey;
      this.cityName = cityName
    }


  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const coordinateData = await fetch(query)
    return coordinateData;
  }


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    console.log(locationData)
    const lat= locationData[0].lat;
    const lon= locationData[0].lon;
    return {lat, lon}
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
return `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName} &appid=${this.APIkey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const geocodeQuery = this.buildGeocodeQuery();
    console.log(geocodeQuery)
  const locationData = await this.fetchLocationData(geocodeQuery);
  const locationJson = await locationData.json(); 
  console.log(locationJson)
  const coordinates = this.destructureLocationData(locationJson);
  return coordinates;
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
  const weatherResponse = await fetch(weatherQuery);
  return weatherResponse.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0]; // Assuming first item in list is current weather
  const weather = new Weather(
    this.cityName,
    currentWeather.dt_txt, 
    currentWeather.weather[0].icon, 
    currentWeather.weather[0].description,
    currentWeather.main.temp, 
    currentWeather.wind.speed.toString(), 
    currentWeather.main.humidity.toString()
  );
  return weather;
  }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray = [currentWeather];

    weatherData.slice(0, 5).forEach((forecast) => { 
      const weather = new Weather(
        this.cityName,
        forecast.dt_txt,
        forecast.weather[0].icon,
        forecast.weather[0].description,
        forecast.main.temp,
        forecast.wind.speed.toString(),
        forecast.main.humidity.toString()
      );
      console.log(forecast.dt_txt);
      console.log(forecast.main.temp)
      forecastArray.push(weather);
    });
    
    return forecastArray;
   }
   

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city; // Update the city name
  const coordinates = await this.fetchAndDestructureLocationData();
  const weatherData = await this.fetchWeatherData(coordinates);
  const currentWeather = this.parseCurrentWeather(weatherData);
  const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
  
  return forecastArray;
  }
}

const baseURL = 'http://api.openweathermap.org';
const APIkey = process.env.API_KEY || '159516bd001985ebdd55bf62524d0ad9';
const cityName = 'default_city';

export default new WeatherService(baseURL, APIkey, cityName);

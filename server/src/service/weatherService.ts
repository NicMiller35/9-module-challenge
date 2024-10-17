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
class WeatherService {
  baseURL: string;
  APIkey: string;
  cityName: string;

  constructor(baseURL: string,
    APIkey: string,
    cityName: string,) {
      this.baseURL = baseURL;
      this.APIkey = APIkey;
      this.cityName = cityName
    }


  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const coridinateData = await fetch(query)
    return coridinateData;
  }


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const lat= locationData[0].lat;
    const lon= locationData[0].lon;
    return {lat, lon}
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
return "http://api.openweathermap.org/geo/1.0/direct?q="+ this.cityName;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${this.APIkey}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();

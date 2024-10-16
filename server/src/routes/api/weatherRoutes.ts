import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// test these in insomnia!!
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
  const cityWeather = await WeatherService.getWeatherByCity(req.body.city);
  res.json(cityWeather);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
  //do I need to make a seperate function for this or can I put it in the same try block?
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const savedCities = await HistoryService.getCities(req.body.city);
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;

import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const cities = await fs.readFile('searchHistory.json', 'utf8');
      return JSON.parse(cities);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        console.error('Error reading the file:', error);
        return [];
      }
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
    await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
    } catch (error: any) {
    console.error('Error writing the file:', error);
    }
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(name: string): Promise<void> {

    const cities = await this.read();
    const newCity = new City(name, uuidv4());
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}
  

export default new HistoryService();

// can you explain this to me?


 // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
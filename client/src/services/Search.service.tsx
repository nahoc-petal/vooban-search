import axios from 'axios';
import { slugify } from './../utils';
import { API_URL } from './services.constants';

class SearchService {
  public async getCitiesBySearchTerm(searchTerm: string) {
    return await axios.get(`${API_URL}/suggestions/getCities?q=${slugify(searchTerm)}`);
  }
}

export default new SearchService();
import axios from 'axios';
import { API_URL } from './constants';
import { slugify } from './../utils';

class SearchService {
  async getCitiesBySearchTerm(searchTerm) {
    return await axios.get(`${API_URL}/suggestions/getCities?q=${slugify(searchTerm)}`);
  }
}

export default new SearchService();
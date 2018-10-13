import axios from 'axios';
import { API_URL } from './constants';
import { slugify } from './../utils';

class SearchService {
  async getCitiesBySearchTerm(searchTerm) {
    return await axios.get(`${API_URL}/suggestions?filter={
      "where":{
        "name":{
          "like":"${slugify(searchTerm)}",
          "options":"i"
        }
      },
      "limit":"7"
    }`);
  }
}

export default new SearchService();
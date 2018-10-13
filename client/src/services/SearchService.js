import axios from 'axios';

class SearchService {
  async getCities(searchTerm) {
    console.log(searchTerm);
    return await axios.get('https://cors-anywhere.herokuapp.com/https://reddit.com/r/videos.json');
  }
}

export default new SearchService();
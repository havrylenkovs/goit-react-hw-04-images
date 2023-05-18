import axios from 'axios';

const API_KEY = '31523940-001a34e6ef463768beef02e4d';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(BASE_URL, {
    method: 'get',
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  console.log(response.data);
  console.log(response.data.hits);

  return response.data;
};
export default fetchImages;

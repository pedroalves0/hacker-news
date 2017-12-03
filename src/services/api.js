import axios from 'axios';
import axiosRetry from 'axios-retry';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

axiosRetry(axios, { retries: 3 });

export const fetchItemsIds = () => fetchFromBaseUrl('/newstories.json');

export const fetchItem = id => fetchFromBaseUrl(`/item/${id}.json`);

function fetchFromBaseUrl(suffix) {
    return axios.get(BASE_URL + suffix).then(response => response.data);
}
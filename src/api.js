import axios from 'axios';

let api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://min-api.cryptocompare.com',
    headers: {
        common: {
            'Authorization': 'Apikey ' + process.env.REACT_APP_API_KEY,
        },
        'Access-Control-Allow-Origin': '*',
    }
});

export default api;
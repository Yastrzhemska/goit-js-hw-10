

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
const API_KEY = "live_ONDE7whOOmjntb5OU3N9yt0DEKUHLmooJCG0SMNWsnyLgUda590ArBWLJ3b4xaQo";

export function fetchBreeds() {
    return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
    
};

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });  
};





// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
// 'live_H24JXYBVrrM9Zqd0AhOom07voavPNPg9MNCpoSpk17G91i6mXMnj02i3p6IfEKdP';
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

// export function fetchBreeds(endPoint) {
// return axios.get(endPoint).then(data => {
//     return data.data;
// });
// }

// export function fetchCatByBreed(endPoint, breedId) {
// const catByBreed = endPoint + '?breed_ids=' + breedId;
// return axios.get(catByBreed).then(resp => {
//     return resp.data;
// });
// }







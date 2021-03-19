/* eslint-disable no-undef */
import { trendingFill } from '../templates/templates.js'

const base_url = 'http://api.giphy.com/v1/gifs';
const upload_url = 'http://upload.giphy.com/v1/gifs';
const apiKey = 'api_key=osWuwacDvhPrwMMDVakrXogzcrd8qsiD';

const default_limit = 12;

export const uploadGifReq = async (myFileData) => {
    try {
        let response = await fetch(upload_url + `?${apiKey}`, {
            method: 'POST',
            body: myFileData
        });

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

export const trendFunc = async () => {
    try {
        const result = await fetch(`http://api.giphy.com/v1/gifs/trending?${apiKey}&limit=${default_limit}&rating=G`);
        const jsonResult = await result.json();

        trendingFill(jsonResult);
    } catch (er) {
        console.log(er.message);
    }
};

export const searchGifReq = async (query) => {
    try {
        //const response = await fetch(`${base_url}/search?api_key=${apiKey}&q=${keyWord}&limit=15&rating=G`)
        const response = await fetch(`${base_url}/search?${apiKey}&q=${query}&limit=${default_limit}&rating=G`);
        return await response.json();

    } catch (error) {
        console.error(error);
    }
};



export const getById = async (id) => {
    try {
        const response = await fetch(base_url + `/${id}?${apiKey}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

/*export const getGifByIds = async (ids) => { // ids- array (of ids)
    let idArr=[];
    for(const item of ids){

    }

    try {
        const response = await fetch(base_url + `/${id}?${apiKey}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
*/
import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

import config from '../config';
import { getAuthToken } from '../context/auth';

/*
axios.get(url, { headers, httpsAgent, etc })
axios.post(url, body, { headers, httpsAgent, etc })
*/

https.globalAgent.options.rejectUnauthorized = false;

const setRequestHeaders = (): AxiosRequestConfig => ({
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
        'Content-Type': 'application/json',
        'token': getAuthToken(),
    },
});

export async function doSearch(query: string): Promise<any[]> {
    let response;

    try {
        response = await axios.post(
            `${config.api.baseUrl}/api/snippets/search`,
            { q: query },
            setRequestHeaders(),
        );
    } catch (err) {
        console.log(err);
        throw new Error('Something happened...');
    }

    if (response && response.data && response.data.status === 'ok') {
        if (response.data.snippets && response.data.snippets.length) {
            return response.data.snippets;
        } else {
            throw new Error('No results found.');
        }
    } else {
        throw new Error('Got empty response from server.');
    }
}

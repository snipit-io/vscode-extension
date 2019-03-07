import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

import config from '../config';
import { getAuthToken, clearAuthToken } from '../context/auth';

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

export async function pingServer(): Promise<boolean> {
    const response = await axios.get(`${config.api.baseUrl}/api`, setRequestHeaders());

    return response && response.data && response.data.status === 'ok';
}

export async function pingAuthServer(): Promise<boolean> {
    try {
        const response = await axios.get(`${config.api.baseUrl}/api/auth/permissions`, setRequestHeaders());
        return response && response.data && response.data.auth;
    } catch (error) {
        return false;
    }
}

export async function doSearch(query: string): Promise<any[]> {
    try {
        const response = await axios.post(
            `${config.api.baseUrl}/api/snippets/search`,
            { q: query },
            setRequestHeaders(),
        );

        if (response && response.data && response.data.status === 'ok') {
            if (response.data.snippets && response.data.snippets.length) {
                return response.data.snippets;
            } else {
                throw new Error('No results found.');
            }
        } else {
            throw new Error('Got empty response from server.');
        }
    } catch (error) {
        if (error.response.status === 403 && getAuthToken()) {
            clearAuthToken();
        }
        throw error;
    }
}

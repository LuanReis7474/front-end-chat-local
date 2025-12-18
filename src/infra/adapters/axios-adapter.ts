import { api } from '@/services/api';
import axios, { AxiosResponse } from 'axios';

export interface HttpRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: any;
}

export interface HttpClient {
    request: (data: HttpRequest) => Promise<any>;
}

export class AxiosHttpClientAdapter implements HttpClient {
    async request(data: any): Promise<any> {
        let axiosResponse: AxiosResponse;

        try {
            axiosResponse = await api.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers,
            })
        }
        catch (error) {
            throw error;
        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse?.data
        }
    }
}
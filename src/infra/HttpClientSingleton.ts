import { AxiosHttpClientAdapter } from "./adapters/axios-adapter";
import { HttpClient } from "./adapters";

export class HttpClientSingleton {
    private static instance: HttpClient;

    private constructor() { }

    public static getInstance(): HttpClient {
        if (!HttpClientSingleton.instance) {
            HttpClientSingleton.instance = new AxiosHttpClientAdapter();
        }

        return HttpClientSingleton.instance;
    }
}
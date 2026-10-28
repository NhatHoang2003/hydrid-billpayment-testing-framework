import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from 'axios';
import { randomUUID } from 'crypto';

import {
    env,
    getAuthHeaders,
    AuthMethod,
} from '../config/env.config';

export interface RequestOptions extends AxiosRequestConfig {
    authMethod?: AuthMethod;
}

export class BaseApiClient {
    protected client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: env.baseURL,
            timeout: env.timeout,
            validateStatus: () => true
        });
    }

    async request<T>(
        method: Method,
        url: string,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        const authMethod =
            options.authMethod ?? env.defaultAuthMethod;

        return this.client.request<T>({
            method,
            url,
            ...options,
            headers: {
                ...getAuthHeaders(authMethod),
                ...options.headers,
                'X-Request-Id': randomUUID(),
            },
        });
    }

    async get<T>(
        url: string,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        return this.request<T>('GET', url, options);
    }

    async post<T>(
        url: string,
        data?: object | string,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        return this.request<T>('POST', url, {
            ...options,
            data,
        });
    }

    async put<T>(
        url: string,
        data?: object,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        return this.request<T>('PUT', url, {
            ...options,
            data,
        });
    }

    async patch<T>(
        url: string,
        data?: object,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        return this.request<T>('PATCH', url, {
            ...options,
            data,
        });
    }

    async delete<T>(
        url: string,
        options: RequestOptions = {}
    ): Promise<AxiosResponse<T>> {
        return this.request<T>('DELETE', url, options);
    }
}
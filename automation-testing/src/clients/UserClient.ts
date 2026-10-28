import { CreateUserRequest, GetUsersParams, UserResponse, UsersListResponse } from "../types/user.types";

import { BaseApiClient, RequestOptions } from "./BaseApiClient";

export class UserClient extends BaseApiClient {

    async getListUser(
        params?: GetUsersParams | Record<string, unknown>,
        options: RequestOptions = {}
    ) {
        return this.get<UsersListResponse>(
            '/v1/users',
            {
                params,
                ...options,
            }
        );
    }

    async postUser(
        payload?: CreateUserRequest | Record<string, unknown> | string,
        options: RequestOptions = {}
    ) {
        return this.post<UserResponse>(
            '/v1/users',
            payload,
            options
        );
    }

    async getUserById(
        userId: string,
        options: RequestOptions = {}
    ) {
        return this.get<UserResponse>(
            `/v1/users/${userId}`,
            options
        );
    }

    async deleteUser(
        userId: string,
        options: RequestOptions = {}
    ) {
        return this.delete(
            `/v1/users/${userId}`,
            options
        );
    }
}
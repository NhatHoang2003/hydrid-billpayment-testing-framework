import { test, expect } from '../../../src/fixtures/api.fixture';

import {
    ApiSuccessResponseSchema,
    ApiErrorResponseSchema,
} from '../../../src/schemas/common.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { generateUniqueEmail } from '../../../src/helpers/testDataGenerator';
import { UserClient } from '../../../src/clients/user.client';

async function createDisposableUser(userClient: UserClient): Promise<string> {
    const response = await userClient.postUser({
        email: generateUniqueEmail(),
        firstName: 'Delete',
        lastName: 'Test',
    });

    expect(response.status).toBe(201);

    const createdData = await SchemaValidator.validate(
        ApiSuccessResponseSchema,
        response.data,
        'POST /v1/users - Create disposable user',
    );

    return createdData.data.id;
}

test.describe('DELETE /v1/users/{id} - Delete User', () => {
    test('@regression @C217 @USER-217 should delete an existing user without associated bills',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const response = await userClient.deleteUser(userId);

            expect(response.status).toBe(200);

            const data = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Success Response',
            );

            expect(data.success).toBe(true);
            expect(data.data.id).toBe(userId);
            expect(data.data.deleted).toBe(true);
        },
    );

    test('@regression @C218 @USER-218 should return the requested user ID in the delete response',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const response = await userClient.deleteUser(userId);

            expect(response.status).toBe(200);

            const data = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Success Response',
            );

            expect(data.data.id).toBe(userId);
        },
    );

    test('@regression @C219 @USER-219 should indicate the user was deleted',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const response = await userClient.deleteUser(userId);

            expect(response.status).toBe(200);

            const data = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Success Response',
            );

            expect(data.data.deleted).toBe(true);
        },
    );

    test('@regression @C220 @USER-220 should return 404 when retrieving a deleted user',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const deleteResponse = await userClient.deleteUser(userId);

            expect(deleteResponse.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                deleteResponse.data,
                'DELETE /v1/users/{id} - Success Response',
            );

            const getResponse = await userClient.getUserById(userId);

            expect(getResponse.status).toBe(404);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                getResponse.data,
                'GET /v1/users/{id} - Deleted User Not Found',
            );

            expect(errorData.error.code).toBe('NOT_FOUND');
        },
    );

    test('@regression @C221 @USER-221 should return 404 when deleting the same user twice',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const firstDelete = await userClient.deleteUser(userId);

            expect(firstDelete.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                firstDelete.data,
                'DELETE /v1/users/{id} - First Delete',
            );

            const secondDelete = await userClient.deleteUser(userId);

            expect(secondDelete.status).toBe(404);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                secondDelete.data,
                'DELETE /v1/users/{id} - Repeated Delete Error',
            );

            expect(errorData.error.code).toBe('NOT_FOUND');
        },
    );

    test('@regression @C222 @USER-222 should return 404 for a non-existent user ID',
        async ({ userClient }) => {
            const response = await userClient.deleteUser('user-not-found-qa-222');

            expect(response.status).toBe(404);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Not Found Response',
            );

            expect(errorData.success).toBe(false);
            expect(errorData.error.code).toBe('NOT_FOUND');
        },
    );

    test('@regression @C223 @USER-223 should return 404 for an invalid user ID',
        async ({ userClient }) => {
            const response = await userClient.deleteUser('invalid-user-id');

            expect(response.status).toBe(404);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Invalid ID Response',
            );

            expect(errorData.success).toBe(false);
            expect(errorData.error.code).toBe('NOT_FOUND');
        },
    );

    test('@regression @C224 @USER-224 should return 409 when the user has associated bills',
        async ({ userClient }) => {
            const response = await userClient.deleteUser('user-demo-001');

            expect(response.status).toBe(409);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Conflict Response',
            );

            expect(errorData.success).toBe(false);
            expect(errorData.error.code).toBe('CONFLICT');
            expect(errorData.error.message).toMatch(/bill/i);
        },
    );

    test('@regression @C225 @USER-225 should keep the user after deletion is rejected',
        async ({ userClient }) => {
            const userId = 'user-demo-001';
            const deleteResponse = await userClient.deleteUser(userId);

            expect(deleteResponse.status).toBe(409);

            const deleteError = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                deleteResponse.data,
                'DELETE /v1/users/{id} - Conflict Response',
            );

            expect(deleteError.error.code).toBe('CONFLICT');

            const getResponse = await userClient.getUserById(userId);

            expect(getResponse.status).toBe(200);

            const userData = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                getResponse.data,
                'GET /v1/users/{id} - User Still Exists',
            );

            expect(userData.data.id).toBe(userId);
        },
    );

    test('@regression @C226 @USER-226 should return a successful response matching the schema',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const response = await userClient.deleteUser(userId);

            expect(response.status).toBe(200);

            const data = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Success Schema',
            );

            expect(data.success).toBe(true);
            expect(data.data.deleted).toBe(true);
            expect(data.data.id).toBe(userId);
        },
    );

    test('@regression @C227 @USER-227 should return a valid error schema for 404',
        async ({ userClient }) => {
            const response = await userClient.deleteUser('user-15db1d4c');

            expect(response.status).toBe(404);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Not Found Schema',
            );

            expect(errorData.success).toBe(false);
            expect(errorData.error.code).toBe('NOT_FOUND');
        },
    );

    test('@regression @C228 @USER-228 should return a valid error schema for 409',
        async ({ userClient }) => {
            const response = await userClient.deleteUser('user-demo-001');

            expect(response.status).toBe(409);

            const errorData = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Conflict Schema',
            );

            expect(errorData.success).toBe(false);
            expect(errorData.error.code).toBe('CONFLICT');
        },
    );

    test('@regression @C229 @USER-229 should propagate a custom X-Request-Id header',
        async ({ userClient }) => {
            const userId = await createDisposableUser(userClient);
            const requestId = 'test-delete-229';

            const response = await userClient.deleteUser(userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-Id': requestId,
                },
            });

            expect(response.status).toBe(200);

            const data = await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'DELETE /v1/users/{id} - Request ID Response',
            );

            expect(data.success).toBe(true);
            expect(data.meta.requestId).toBe(requestId);
        },
    );
});
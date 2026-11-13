import { test, expect } from '../../../src/fixtures/api.fixture';

import {
    ApiSuccessResponseSchema,
    ApiErrorResponseSchema,
} from '../../../src/schemas/common.schemas';
import { UserResponseSchema } from '../../../src/schemas/user.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';

import {
    getUserByIdPositiveCases,
    getUserByIdNegativeCases,
    getUserByIdAuthenticationCases,
    getUserByIdSchemaCases,
} from '../../../src/data/api/users/get-user-by-id.data';

test.describe('GET /v1/users/{id} - Get User By ID', () => {

    // ===== 1. Successful Retrieval (USER-138 -> 140) =====
    for (const testCase of getUserByIdPositiveCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getUserById(testCase.userId);

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response'
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    test(
        '@regression @C141 @USER-141 should return user details when optional fields are absent or null',
        async ({ userClient }) => {
            const userId = 'user-1e596b00';
            const response = await userClient.getUserById(userId);

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response',
            );

            expect(response.data.success).toBe(true);
            expect(response.data.data.id).toBe(userId);
            expect(response.data.data.address?.line2 ?? null).toBeNull();
        },
    );

    // ===== 2. Non-existent and Boundary IDs (USER-142 -> 152, 164) =====
    for (const testCase of getUserByIdNegativeCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getUserById(
                encodeURIComponent(testCase.userId)
            );

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'GET /v1/users/{id} - Error Response'
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 3. Authentication (USER-153 -> 155) =====
    for (const testCase of getUserByIdAuthenticationCases) {
        test(testCase.name, async ({ userClient }) => {
            let response;

            if (testCase.authType === 'missing') {
                response = await userClient.getUserById(
                    testCase.userId,
                    {
                        headers: {
                            'X-API-Key': undefined as unknown as string,
                        },
                    }
                );
            } else if (testCase.authType === 'invalid') {
                response = await userClient.getUserById(
                    testCase.userId,
                    {
                        headers: {
                            'X-API-Key': 'invalid-key-123',
                        },
                    }
                );
            } else {
                response = await userClient.getUserById(
                    testCase.userId,
                    {
                        headers: {
                            'X-API-Key': '',
                        },
                    }
                );
            }

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'GET /v1/users/{id} - Authentication Error'
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 4. Headers and Content Negotiation (USER-156 -> 160) =====

    test('@regression @C156 @USER-156 should return JSON when Accept header is missing',
        async ({ userClient }) => {
            const response = await userClient.getUserById(
                'user-demo-001',
                {
                    headers: {
                        Accept: undefined as unknown as string,
                    },
                }
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response'
            );

            expect(response.data).toMatchObject({
                success: true,
                data: {
                    id: 'user-demo-001',
                },
                meta: {
                    requestId: expect.any(String),
                    timestamp: expect.any(String),
                    version: 'v1',
                },
            });
        }
    );

    test('@regression @C157 @USER-157 should return XML when Accept requests application/xml',
        async ({ userClient }) => {
            const response = await userClient.getUserById(
                'user-demo-001',
                {
                    headers: {
                        Accept: 'application/xml',
                    },
                }
            );

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('xml');

            const xml = String(response.data);

            expect(xml).toContain('user-demo-001');
            expect(xml.toLowerCase()).toContain('success');
            expect(xml.toLowerCase()).toContain('requestid');
            expect(xml.toLowerCase()).toContain('timestamp');
            expect(xml.toLowerCase()).toContain('version');
        }
    );

    test('@regression @C158 @USER-158 should propagate a custom X-Request-Id header',
        async ({ userClient }) => {
            const requestId = 'test-request-123';

            const response = await userClient.getUserById(
                'user-demo-001',
                {
                    headers: {
                        'X-Request-Id': requestId,
                    },
                }
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response'
            );

            expect(response.headers['x-request-id']).toBe(requestId);
            expect(response.data.data.id).toBe('user-demo-001');
        }
    );

    test('@regression @C159 @USER-159 should return a request ID when X-Request-Id is missing',
        async ({ userClient }) => {
            const response = await userClient.getUserById('user-demo-001');

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response'
            );

            expect(response.headers['x-request-id']).toBeTruthy();
            expect(response.data.data.id).toBe('user-demo-001');
        }
    );

    test('@regression @C160 @USER-160 should return JSON with an unsupported Content-Type header',
        async ({ userClient }) => {
            const response = await userClient.getUserById(
                'user-demo-001',
                {
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                }
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                response.data,
                'GET /v1/users/{id} - Success Response'
            );

            expect(response.data).toMatchObject({
                success: true,
                data: {
                    id: 'user-demo-001',
                },
            });
        }
    );

    // ===== 5. Unsupported Method (USER-161) =====
    test('@regression @C161 @USER-161 should reject POST to the user-by-ID endpoint',
        async ({ userClient }) => {
            const userId = 'user-demo-001';

            const response = await userClient.request(
                'POST',
                `/v1/users/${encodeURIComponent(userId)}`,
                {
                    data: {},
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            expect(response.status).toBe(405);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'POST /v1/users/{id} - Error Response'
            );

            const errorBody = response.data as unknown as {
                error: {
                    code: string;
                    message: string;
                    traceId: string;
                };
            };

            expect(response.data).toMatchObject({
                success: false,
                error: {
                    code: 'METHOD_NOT_ALLOWED',
                },
            });

            expect(errorBody.error.message).toContain('POST');
            expect(errorBody.error.traceId).toBe(
                response.headers['x-request-id']
            );
        }
    );

    // ===== 6. Response Schema and Metadata (USER-162 -> 166) =====
    for (const testCase of getUserByIdSchemaCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getUserById(testCase.userId);

            expect(response.status).toBe(200);

            if (testCase.validation === 'successSchema') {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'GET /v1/users/{id} - Success Schema'
                );

                await SchemaValidator.validate(
                    UserResponseSchema,
                    response.data,
                    'GET /v1/users/{id} - User Schema'
                );
            } else {
                await SchemaValidator.validate(
                    UserResponseSchema,
                    response.data,
                    'GET /v1/users/{id} - User Schema'
                );

                if (testCase.validation === 'userAndAddressTypes') {
                    expect(typeof response.data.data.id).toBe('string');
                    expect(typeof response.data.data.email).toBe('string');
                    expect(typeof response.data.data.firstName).toBe('string');
                    expect(typeof response.data.data.kycStatus).toBe('string');
                    expect(response.data.data.address).toEqual(expect.any(Object));
                    expect(typeof response.data.data.address?.line1).toBe('string');
                }

                if (testCase.validation === 'metadata') {
                    expect(response.data.meta.requestId).toBeTruthy();
                    expect(response.data.meta.timestamp).toBeTruthy();
                    expect(response.data.meta.version).toBe('v1');
                }

                if (testCase.validation === 'timestamp') {
                    expect(Number.isNaN(Date.parse(response.data.meta.timestamp))).toBe(false);
                    expect(response.data.meta.timestamp).toMatch(
                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/
                    );
                }
            }

            expect(response.data.success).toBe(true);
        });
    }

    // ===== 7. Repeated Requests (USER-167) =====
    test('@regression @C167 @USER-167 should return consistent user data on repeated requests',
        async ({ userClient }) => {
            const firstResponse = await userClient.getUserById('user-demo-001');
            const secondResponse = await userClient.getUserById('user-demo-001');

            expect(firstResponse.status).toBe(200);
            expect(secondResponse.status).toBe(200);

            await SchemaValidator.validate(
                UserResponseSchema,
                firstResponse.data,
                'GET /v1/users/{id} - First Response'
            );

            await SchemaValidator.validate(
                UserResponseSchema,
                secondResponse.data,
                'GET /v1/users/{id} - Second Response'
            );

            expect(firstResponse.data.success).toBe(true);
            expect(secondResponse.data.success).toBe(true);
            expect(firstResponse.data.data).toEqual(secondResponse.data.data);
        }
    );
});
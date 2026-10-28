import { test, expect } from '../../../src/fixtures/apiFixture';

import { ApiSuccessResponseSchema, ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { generateUniqueEmail } from '../../../src/helpers/testDataGenerator';

import {
    miniUserPositiveCases,
    miniUserNegativeCases,
    detailUserPositiveCases,
    detailUserNegativeCases,
    emailValidationCases,
    phoneValidationCases,
    nameValidationCases,
    addressValidationCases
} from '../../../src/data/api/users/create-user-cases';

test.describe('POST /v1/users - Create User', () => {

    // ===== 1. Minimal User (USER-053 -> 076) =====
    for (const testCase of miniUserPositiveCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of miniUserNegativeCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    test('@regression @C064 @USER-064 should reject duplicate email',
        async ({ userClient }) => {

            const payload = {
                email: generateUniqueEmail(),
                firstName: 'New',
            };

            const first = await userClient.postUser(payload);

            expect(first.status).toBe(201);

            const response = await userClient.postUser(payload);

            expect(response.status).toBe(409);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'POST /v1/users - Error Response'
            );

            expect(response.data).toMatchObject({
                success: false,
                error: {
                    code: 'CONFLICT',
                    message: 'A user with this email already exists',
                },
            });
        }
    );

    // ===== 2. Full Details (USER-077 -> 102) =====
    for (const testCase of detailUserPositiveCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of detailUserNegativeCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 3. Authentication & Headers (USER-103 -> 109) =====
    test('@smoke @regression @C103 @USER-103 should reject request when X-API-Key is missing',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                { email: generateUniqueEmail(), firstName: 'New' },
                { headers: { 'X-API-Key': undefined as unknown as string } }
            );

            expect(response.status).toBe(401);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'POST /v1/users - Error Response'
            );

            expect(response.data).toMatchObject({
                success: false,
                error: {
                    code: 'MISSING_AUTHENTICATION',
                    message: 'Authentication required. Provide API Key, Bearer token, Basic auth credentials, or session cookie.',
                },
            });
        }
    );

    test('@regression @C104 @USER-104 should reject request with invalid X-API-Key',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                { email: generateUniqueEmail(), firstName: 'New' },
                { headers: { 'X-API-Key': 'invalid-api-key' } }
            );

            expect(response.status).toBe(401);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'POST /v1/users - Error Response'
            );

            expect(response.data).toMatchObject({
                success: false,
                error: {
                    code: 'INVALID_API_KEY',
                    message: 'The provided API key is invalid.',
                },
            });
        }
    );

    test('@regression @C105 @USER-105 should reject request with empty X-API-Key',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                { email: generateUniqueEmail(), firstName: 'New' },
                { headers: { 'X-API-Key': '' } }
            );

            expect(response.status).toBe(401);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'POST /v1/users - Error Response'
            );

            expect(response.data).toMatchObject({
                success: false,
                error: {
                    code: 'MISSING_AUTHENTICATION',
                    message: 'Authentication required. Provide API Key, Bearer token, Basic auth credentials, or session cookie.',
                },
            });
        }
    );

    test('@regression @C106 @USER-106 should accept request without Content-Type header',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                JSON.stringify({ email: generateUniqueEmail(), firstName: 'New' }),
                { headers: { 'Content-Type': undefined as unknown as string } }
            );

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.data.id).toBeTruthy();
        }
    );

    test('@regression @C107 @USER-107 should accept request with Content-Type text/plain',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                JSON.stringify({ email: generateUniqueEmail(), firstName: 'New' }),
                { headers: { 'Content-Type': 'text/plain' } }
            );

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.data.id).toBeTruthy();
        }
    );

    test('@regression @C108 @USER-108 should create user and return requestId when X-Request-Id is missing',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                { email: generateUniqueEmail(), firstName: 'New' },
                { headers: { 'X-Request-Id': undefined as unknown as string } }
            );

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.data.id).toBeTruthy();
            expect(response.data.meta.requestId).toBeTruthy();
        }
    );

    test('@regression @C109 @USER-109 should propagate custom X-Request-Id',
        async ({ userClient }) => {

            const response = await userClient.postUser(
                { email: generateUniqueEmail(), firstName: 'New' },
                { headers: { 'X-Request-Id': 'test-create-user-109' } }
            );

            test.fixme(
                true,
                'BUG-REQUEST-ID-META-MISMATCH: meta.requestId does not match the submitted X-Request-Id'
            );

            // console.log('header:', response.headers['x-request-id'], '| body:', response.data.meta.requestId);

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.data.id).toBeTruthy();
            expect(response.data.meta.requestId).toBe('test-create-user-109');
            console.log(response.config.headers['X-Request-Id']);
        }
    );

    // ===== 4. Extended Validation (USER-110 -> 131) =====
    for (const testCase of emailValidationCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of phoneValidationCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of nameValidationCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of addressValidationCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.postUser(testCase.payload);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'POST /v1/users',
            //     testCase.payload,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 201) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'POST /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 5. Response Validation (USER-132 -> 135) =====
    test('@regression @C132 @USER-132 should return successful response matching the success schema',
        async ({ userClient }) => {

            const response = await userClient.postUser({
                email: generateUniqueEmail(),
                phone: '+919876543210',
                firstName: 'New',
                lastName: 'User',
                kycStatus: 'pending',
                address: {
                    line1: '123 Main Street',
                    line2: 'Apartment 2',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    postalCode: '400001',
                    country: 'IN',
                },
            });

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data).toEqual(
                expect.objectContaining({
                    success: true,
                    data: expect.any(Object),
                    meta: expect.any(Object),
                })
            );

            expect(response.data.data).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    email: expect.any(String),
                    firstName: 'New',
                    lastName: 'User',
                    kycStatus: 'pending',
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            );
        }
    );

    test('@regression @C133 @USER-133 should return generated user id in successful response',
        async ({ userClient }) => {

            const response = await userClient.postUser({ email: generateUniqueEmail(), firstName: 'New' });

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(typeof response.data.data.id).toBe('string');
            expect(response.data.data.id).toBeTruthy();
        }
    );

    test('@regression @C134 @USER-134 should return valid createdAt and updatedAt timestamps',
        async ({ userClient }) => {

            const response = await userClient.postUser({ email: generateUniqueEmail(), firstName: 'New' });

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            const { createdAt, updatedAt } = response.data.data;

            expect(createdAt).toBeTruthy();
            expect(updatedAt).toBeTruthy();

            expect(Number.isNaN(Date.parse(String(createdAt)))).toBe(false);
            expect(Number.isNaN(Date.parse(String(updatedAt)))).toBe(false);
        }
    );

    test('@regression @C135 @USER-135 should return response metadata',
        async ({ userClient }) => {

            const response = await userClient.postUser({ email: generateUniqueEmail(), firstName: 'New' });

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.meta).toMatchObject({
                requestId: expect.any(String),
                timestamp: expect.any(String),
                version: 'v1',
            });
        }
    );

    // ===== 6. Data Integrity (USER-136 -> 137) =====
    test('@regression @C136 @USER-136 should accept duplicate email with different letter case',
        async ({ userClient }) => {

            const email = generateUniqueEmail();

            const setup = await userClient.postUser({
                email: email.toLowerCase(),
                firstName: 'New',
            });

            expect(setup.status).toBe(201);

            const response = await userClient.postUser({
                email: email.toUpperCase(),
                firstName: 'New',
            });

            expect(response.status).toBe(201);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'POST /v1/users - Success Response'
            );

            expect(response.data.data.id).toBeTruthy();
            expect(response.data.data.id).not.toBe(setup.data.data.id);
        }
    );

    test('@regression @C137 @USER-137 should create different users sharing the same name and phone number',
        async ({ userClient }) => {

            const first = await userClient.postUser({
                email: generateUniqueEmail(),
                phone: '+919876543210',
                firstName: 'New',
                lastName: 'User',
            });

            const second = await userClient.postUser({
                email: generateUniqueEmail(),
                phone: '+919876543210',
                firstName: 'New',
                lastName: 'User',
            });

            for (const response of [first, second]) {
                expect(response.status).toBe(201);

                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'POST /v1/users - Success Response'
                );
            }

            expect(first.data.data.id).toBeTruthy();
            expect(second.data.data.id).toBeTruthy();
            expect(first.data.data.id).not.toBe(second.data.data.id);
        }
    );
});
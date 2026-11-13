import { test, expect } from '../../../src/fixtures/api.fixture';

import {
    ApiSuccessResponseSchema,
    ApiErrorResponseSchema,
} from '../../../src/schemas/common.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { UserClient } from '../../../src/clients/user.client';

import {
    putUserPositiveCases,
    putUserRequiredFieldCases,
    putUserPhoneCases,
    putUserDataTypeCases,
    putUserOmittedFieldCases,
    putUserNotFoundCases,
    putUserSchemaCases,
    putUserRequestIdCase,
} from '../../../src/data/api/users/put-replace-user.data';

test.describe('PUT /v1/users/{id} - Update User', () => {

    // ===== 1. Successful Updates (USER-168 -> 170) =====
    for (const testCase of putUserPositiveCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
            );

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Success Response',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 2. Timestamp Behavior (USER-171 -> 172) =====
    test('@regression @C171 @USER-171 should keep createdAt unchanged after the update',
        async ({ userClient }) => {
            const userId = 'user-3a2f4836';

            const beforeResponse = await userClient.getUserById(userId);
            expect(beforeResponse.status).toBe(200);

            const createdAtBefore = beforeResponse.data.data.createdAt;

            const response = await userClient.putUser(
                userId,
                {
                    email: 'qa.put171@example.com',
                    phone: '12345678901',
                    firstName: 'Test',
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
                },
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Success Response',
            );

            expect(response.data.data.createdAt).toBe(createdAtBefore);
        }
    );

    // test('@regression @C172 @USER-172 should update updatedAt after the request',
    //     async ({ userClient }) => {
    //         const userId = 'user-80fc1245';

    //         const beforeResponse = await userClient.getUserById(userId);
    //         expect(beforeResponse.status).toBe(200);

    //         const updatedAtBefore = beforeResponse.data.data.updatedAt;

    //         const response = await putUser(
    //             userClient,
    //             userId,
    //             {
    //                 email: 'qa.put172@example.com',
    //                 phone: '12345678901',
    //                 firstName: 'Test',
    //                 lastName: 'User',
    //                 kycStatus: 'pending',
    //                 address: {
    //                     line1: '123 Main Street',
    //                     line2: 'Apartment 2',
    //                     city: 'Mumbai',
    //                     state: 'Maharashtra',
    //                     postalCode: '400001',
    //                     country: 'IN',
    //                 },
    //             },
    //         );

    //         expect(response.status).toBe(200);

    //         await SchemaValidator.validate(
    //             ApiSuccessResponseSchema,
    //             response.data,
    //             'PUT /v1/users/{id} - Success Response',
    //         );

    //         const updatedAtAfter = response.data.data.updatedAt;

    //         expect(updatedAtAfter).toBeTruthy();
    //         expect(updatedAtAfter).not.toBe(updatedAtBefore);
    //         expect(Date.parse(updatedAtAfter)).toBeGreaterThan(
    //             Date.parse(updatedAtBefore),
    //         );
    //         expect(updatedAtAfter).toMatch(
    //             /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    //         );
    //     }
    // );

    // ===== 3. Required Field and Email Validation (USER-173 -> 176) =====
    for (const testCase of putUserRequiredFieldCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Validation Error',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 4. Phone Validation (USER-177 -> 181) =====
    for (const testCase of putUserPhoneCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'PUT /v1/users/{id} - Success Response',
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'PUT /v1/users/{id} - Validation Error',
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 5. Data Type Validation (USER-182) =====
    for (const testCase of putUserDataTypeCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if ('bug' in testCase && testCase.bug) {
                test.fixme(true, testCase.bug);
            }

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Validation Error',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 6. Omitted Fields (USER-183 -> 187) =====
    for (const testCase of putUserOmittedFieldCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Success Response',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 7. User ID Validation (USER-188 -> 189) =====
    for (const testCase of putUserNotFoundCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Not Found Response',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    // ===== 8. Response Schema and Metadata (USER-190 -> 192) =====
    for (const testCase of putUserSchemaCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.putUser(
                testCase.userId,
                testCase.payload,
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PUT /v1/users/{id} - Success Response',
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
                expect(Number.isNaN(Date.parse(response.data.meta.timestamp))).toBe(false);
            }

            expect(response.data.success).toBe(true);
        });
    }

    // ===== 9. Custom Request ID (USER-193) =====
    test(putUserRequestIdCase.name, async ({ userClient }) => {
        const response = await userClient.putUser(
            putUserRequestIdCase.userId,
            putUserRequestIdCase.payload,
            {
                headers: {
                    'X-Request-ID': putUserRequestIdCase.requestId,
                },
            }
        );

        expect(response.status).toBe(putUserRequestIdCase.expected.status);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'PUT /v1/users/{id} - Success Response',
        );

        expect(response.data).toMatchObject(
            putUserRequestIdCase.expected.body,
        );
    });
});
import { test, expect } from '../../../src/fixtures/api.fixture';

import {
    ApiSuccessResponseSchema,
    ApiErrorResponseSchema,
} from '../../../src/schemas/common.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';

import { patchUserCases } from '../../../src/data/api/users/patch-update-user.data';

test.describe('PATCH /v1/users/{id} - Update User', () => {
    for (const testCase of patchUserCases) {
        test(testCase.name, async ({ userClient }) => {
            if ('bug' in testCase && testCase.bug) {
                test.fixme(true, testCase.bug);
            }

            const response = await userClient.patchUser(
                testCase.userId,
                testCase.payload,
            );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 400 || response.status === 404) {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'PATCH /v1/users/{id} - Error Response',
                );

                expect(response.data).toMatchObject(testCase.expected.body);
                return;
            }

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PATCH /v1/users/{id} - Success Response',
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    test(
        '@regression @C216 @USER-216 should propagate a custom X-Request-Id',
        async ({ userClient }) => {
            const userId = 'user-ad769b32';
            const requestId = 'test-patch-216';

            const response = await userClient.patchUser(
                userId,
                { firstName: 'Patch216' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Request-Id': requestId,
                    },
                },
            );

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'PATCH /v1/users/{id} - Success Response',
            );

            expect(response.data.success).toBe(true);
            expect(response.data.meta.requestId).toBe(requestId);
        },
    );
});
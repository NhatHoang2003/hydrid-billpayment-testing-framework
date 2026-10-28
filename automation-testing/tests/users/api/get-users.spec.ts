import { test, expect } from '../../../src/fixtures/apiFixture';
import { generalCases, pageCases, limitCases, kycStatusCases, searchCases } from '../../../src/data/api/users/get-users.cases';
import { ApiSuccessResponseSchema, ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';

test.describe('GET /v1/users - List Users', () => {

    for (const testCase of generalCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            expect(response.status).toBe(testCase.expected.status);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'GET /v1/users - Success Response'
            );

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of pageCases) {
        test(testCase.name, async ({ userClient }) => {

            const response = await userClient.getListUser(testCase.params);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'GET /v1/users',
            //     testCase.params,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'GET /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'GET /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    };

    test('@regression @C007 @USER-GET-007 should accept middle valid page', async ({ userClient }) => {
        const totalPages = (await userClient.getListUser({
            page: 1,
            limit: 10,
        })).data.meta.pagination.totalPages;

        const middlePage = Math.max(1, Math.ceil(totalPages / 2));

        const response = await userClient.getListUser({
            page: middlePage,
            limit: 10,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.meta.pagination).toMatchObject({
            page: middlePage,
            limit: 10,
            hasPrev: middlePage > 1,
            hasNext: middlePage < totalPages,
        });
    });


    test('@regression @C008 @USER-GET-008 should accept current max page', async ({ userClient }) => {
        const totalPages = (await userClient.getListUser({
            page: 1,
            limit: 10,
        })).data.meta.pagination.totalPages;

        const response = await userClient.getListUser({
            page: totalPages,
            limit: 10,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.meta.pagination).toMatchObject({
            page: totalPages,
            limit: 10,
            hasNext: false,
            hasPrev: totalPages > 1,
        });
    });


    test('@regression @C009 @USER-GET-009 should return empty data for page just exceeding totalPages', async ({ userClient }) => {
        const totalPages = (await userClient.getListUser({
            page: 1,
            limit: 10,
        })).data.meta.pagination.totalPages;

        const pageAfterLast = totalPages + 1;

        const response = await userClient.getListUser({
            page: pageAfterLast,
            limit: 10,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.data).toEqual([]);

        expect(response.data.meta.pagination).toMatchObject({
            page: pageAfterLast,
            limit: 10,
            hasNext: false,
            hasPrev: true,
        });
    });


    test('@regression @C010 @USER-GET-010 should return empty data for far out-of-bounds page', async ({ userClient }) => {
        const totalPages = (await userClient.getListUser({
            page: 1,
            limit: 10,
        })).data.meta.pagination.totalPages;

        const farPage = totalPages + 1000;

        const response = await userClient.getListUser({
            page: farPage,
            limit: 10,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.data).toEqual([]);

        expect(response.data.meta.pagination).toMatchObject({
            page: farPage,
            limit: 10,
            hasNext: false,
            hasPrev: true,
        });
    });

    for (const testCase of limitCases) {
        test(testCase.name, async ({ userClient }) => {

            const response = await userClient.getListUser(testCase.params);

            // Debugging
            // console.log('baseURL:', response.config.baseURL);
            // console.log('url:', response.config.url);
            // console.log('params:', response.config.params);
            // console.log('final URL:', response.request?.res?.responseUrl);
            // console.log('status:', response.status);
            // console.log('body:', response.data);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'GET /v1/users',
            //     testCase.params,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'GET /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'GET /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of kycStatusCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'GET /v1/users',
            //     testCase.params,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'GET /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'GET /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of searchCases) {
        test(testCase.name, async ({ userClient }) => {
            const response = await userClient.getListUser(testCase.params);

            if ('bug' in testCase && testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug}: Backend validation bug`
                );
            }

            // await ApiEvidence.attach(
            //     'GET /v1/users',
            //     testCase.params,
            //     response
            // );

            expect(response.status).toBe(testCase.expected.status);

            if (response.status === 200) {
                await SchemaValidator.validate(
                    ApiSuccessResponseSchema,
                    response.data,
                    'GET /v1/users - Success Response'
                );
            } else {
                await SchemaValidator.validate(
                    ApiErrorResponseSchema,
                    response.data,
                    'GET /v1/users - Error Response'
                );
            }

            expect(response.data).toMatchObject(testCase.expected.body);
        });
    };

    test('@regression @C043 @USER-GET-043 should find user by full phone number',
        async ({ userClient }) => {

            const listResponse = await userClient.getListUser({
                page: 1,
                limit: 1,
            });

            const phone = listResponse.data.data[0].phone;

            const response = await userClient.getListUser({
                search: phone,
            });

            expect(response.status).toBe(200);

            await SchemaValidator.validate(
                ApiSuccessResponseSchema,
                response.data,
                'GET /v1/users - Success Response'
            );

            expect(response.data.data.length).toBeGreaterThan(0);
            expect(response.data.data[0].phone).toBe(phone);
        }
    );

    test('@regression @C048 @USER-GET-048 middle page: hasNext = true, hasPrev = true', async ({ userClient }) => {
        const response = await userClient.getListUser({
            page: 2,
            limit: 10,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        const pagination = response.data.meta.pagination;

        expect(pagination.page).toBe(2);
        expect(pagination.limit).toBe(10);
        expect(pagination.hasPrev).toBe(true);

        expect(pagination.hasNext).toBe(
            pagination.page < pagination.totalPages
        );
    });

    test('@regression @C049 @USER-GET-049 returned items count does not exceed requested limit', async ({ userClient }) => {
        const limit = 5;

        const response = await userClient.getListUser({
            page: 1,
            limit,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.meta.pagination.limit).toBe(limit);

        expect(response.data.data.length).toBeLessThanOrEqual(limit);
    });

    test('@regression @C050 @USER-GET-050 verify totalPages calculation formula (ceil(total/limit))', async ({ userClient }) => {

        const limit = 7;

        const response = await userClient.getListUser({
            page: 1,
            limit,
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        const pagination = response.data.meta.pagination;

        expect(pagination.limit).toBe(limit);

        expect(pagination.totalPages).toBe(Math.ceil(pagination.total / pagination.limit));
    });


    test('@regression @C051 @USER-GET-051 verify root response structure (success, data, meta)', async ({ userClient }) => {
        const response = await userClient.getListUser();

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data).toEqual(
            expect.objectContaining({
                success: true,
                data: expect.any(Array),
                meta: expect.any(Object),
            })
        );
    });


    test('@regression @C052 @USER-GET-052 ignore unknown params parameters gracefully', async ({ userClient }) => {
        const response = await userClient.getListUser({
            unknown_param: 'hack',
        });

        expect(response.status).toBe(200);

        await SchemaValidator.validate(
            ApiSuccessResponseSchema,
            response.data,
            'GET /v1/users - Success Response'
        );

        expect(response.data.success).toBe(true);
    });
});
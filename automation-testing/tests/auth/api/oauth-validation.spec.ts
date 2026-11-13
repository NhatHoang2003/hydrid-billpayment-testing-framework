import { test, expect } from '../../../src/fixtures/api.fixture';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';

test.describe('POST /oauth/token - General Validation', () => {

    test('@AUTH-007 @C007 @regression @validation should return 400 when grant_type is missing', async ({ authClient }) => {
        const response = await authClient.getToken({
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(400);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
    });

    test('@AUTH-008 @C008 @regression @validation should return 400 when grant_type is unsupported', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'invalid_grant',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(400);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: invalid_grant. Supported: client_credentials, password, refresh_token');
    });

    test('@AUTH-015 @C015 @regression @validation should return 400 when Content-Type is unsupported', async ({ authClient }) => {
        const response = await authClient.getToken(
            {
                grant_type: 'client_credentials',
                client_id: 'demo-client',
                client_secret: 'demo-secret-789',
            },
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            }
        );

        expect(response.status).toBe(400);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_CONTENT_TYPE');
        expect(body.error.message).toBe('Content-Type must be application/x-www-form-urlencoded or application/json');
        expect(body.error.traceId).toBeTruthy();
        expect(body.error.timestamp).toBeTruthy();
    });

    test('@AUTH-016 @C016 @regression @validation should return 400 when request body is omitted', async ({ authClient }) => {
        const response = await authClient.getToken();

        expect(response.status).toBe(400);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
        expect(body.error.traceId).toBeTruthy();
        expect(body.error.timestamp).toBeTruthy();
    });

    test('@AUTH-017 @C017 @regression @validation should return 400 when request body is empty', async ({ authClient }) => {
        const response = await authClient.getToken({});

        expect(response.status).toBe(400);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('UNSUPPORTED_GRANT_TYPE');
        expect(body.error.message).toBe('Unsupported grant_type: undefined. Supported: client_credentials, password, refresh_token');
        expect(body.error.traceId).toBeTruthy();
        expect(body.error.timestamp).toBeTruthy();
    });
});
import { test, expect } from '../../../src/fixtures/api.fixture';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { TokenResponseSchema } from '../../../src/schemas/auth.schemas';
import { ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';
import { invalidClientCases } from '../../../src/data/api/auth/auth-token-cases';

test.describe('POST /oauth/token - Client Credentials Grant', () => {
    test('@smoke @regression @C001 @AUTH-001 should return an access token with valid client credentials', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        expect(response.status).toBe(200);

        const body = await SchemaValidator.validate(
            TokenResponseSchema,
            response.data,
            'Token Response'
        );

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBe(3600);
        expect(typeof body.scope).toBe('string');
    }
    );

    test('@regression @C018 @AUTH-018 should return an access token with valid form-urlencoded credentials', async ({ authClient }) => {
        const payload = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'demo-client',
            client_secret: 'demo-secret-789',
        });

        const response = await authClient.getToken(
            payload.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        expect(response.status).toBe(200);

        const body = await SchemaValidator.validate(
            TokenResponseSchema,
            response.data,
            'Token Response'
        );

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBe(3600);
        expect(typeof body.scope).toBe('string');
    }
    );

    for (const testCase of invalidClientCases) {
        test(`@regression ${testCase.tag} @${testCase.id} @${testCase.testCaseId} ${testCase.name}`, async ({ authClient }) => {
            const response = await authClient.getToken(
                testCase.payload
            );

            expect(response.status).toBe(401);

            const body = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'API Error Response'
            );

            expect(body.success).toBe(false);
            expect(body.error.code).toBe('INVALID_CLIENT');
            expect(body.error.message).toBe('Invalid client credentials');
        });
    }
});
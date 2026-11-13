import { test, expect } from '../../../src/fixtures/api.fixture';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { TokenResponseSchema } from '../../../src/schemas/auth.schemas';
import { ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';
import { invalidPasswordCases } from '../../../src/data/api/auth/auth-token-cases';

test.describe('POST /oauth/token - Password Grant', () => {

    test('@AUTH-002 @C002 @smoke @regression should return an access token with valid username and password', async ({ authClient }) => {
        const response = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
            password: 'password123',
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

    test('@AUTH-023 @C023 @regression should return an access token with valid form-encoded credentials', async ({ authClient }) => {
        const payload = new URLSearchParams({
            grant_type: 'password',
            username: 'demo',
            password: 'password123',
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

    for (const testCase of invalidPasswordCases) {
        test(`@${testCase.id} @C${testCase.id} @regression ${testCase.tag} ${testCase.name}`, async ({ authClient }) => {
            const response = await authClient.getToken(testCase.payload);

            expect(response.status).toBe(401);

            const body = await SchemaValidator.validate(
                ApiErrorResponseSchema,
                response.data,
                'API Error Response'
            );

            expect(body.success).toBe(false);
            expect(body.error.code).toBe('INVALID_GRANT');
            expect(body.error.message).toBe('Invalid username or password');
        });
    }
});
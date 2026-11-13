import { test, expect } from '../../../src/fixtures/api.fixture';
import { SchemaValidator } from '../../../src/helpers/schemaValidator';
import { TokenResponseSchema } from '../../../src/schemas/auth.schemas';
import { ApiErrorResponseSchema } from '../../../src/schemas/common.schemas';

test.describe('POST /oauth/token - Refresh Token Grant', () => {

    test('@AUTH-013 @C013 @regression should return a new access token with a valid refresh token', async ({ authClient }) => {

        const passwordResponse = await authClient.getToken({
            grant_type: 'password',
            username: 'demo',
            password: 'password123',
        });

        expect(passwordResponse.status).toBe(200);

        const passwordBody = await SchemaValidator.validate(
            TokenResponseSchema,
            passwordResponse.data,
            'Password Token Response'
        );

        const refreshToken = passwordBody.refresh_token;

        expect(refreshToken).toBeTruthy();

        const refreshResponse = await authClient.getToken({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        expect(refreshResponse.status).toBe(200);

        const refreshBody = await SchemaValidator.validate(
            TokenResponseSchema,
            refreshResponse.data,
            'Refresh Token Response'
        );

        expect(refreshBody.access_token).toBeTruthy();
        expect(refreshBody.token_type).toBe('Bearer');
        expect(refreshBody.expires_in).toBe(3600);
        expect(refreshBody.refresh_token).toBeTruthy();
    });

    test('@AUTH-014 @C014 @regression @security should return 401 when refresh token is invalid', async ({ authClient }) => {

        const response = await authClient.getToken({
            grant_type: 'refresh_token',
            refresh_token: 'invalid-refresh-token',
        });

        expect(response.status).toBe(401);

        const body = await SchemaValidator.validate(
            ApiErrorResponseSchema,
            response.data,
            'API Error Response'
        );

        expect(body.success).toBe(false);
        expect(body.error.code).toBe('INVALID_GRANT');
        expect(body.error.message).toBe('Invalid refresh token');
    });

});
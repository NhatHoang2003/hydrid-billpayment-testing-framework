import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../src/clients/AuthClient';
import { ApiSuccessResponseSchema } from '../../../src/schemas/common.schemas';

test.describe('Authentication API', () => {
    test('@smoke @C024 @AUTH-024 valid API Key returns current user', async () => {
        const authClient = new AuthClient();

        const response = await authClient.getCurrentUser();

        expect(response.status).toBe(200);

        const body = ApiSuccessResponseSchema.parse(response.data);

        expect(body.success).toBe(true);

        expect(body.data.user.id).toBe('demo-user');
        expect(body.data.user.email).toBe('demo@example.com');
        expect(body.data.user.name).toBe('Demo User');
        expect(body.data.user.scopes).toEqual([
            "read:all",
            "write:all"
        ]);

        expect(body.data.authMethod).toBe('api_key');

        expect(body.meta.version).toBe('v1');
    });
});
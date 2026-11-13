import { test as base } from '@playwright/test';
import { AuthClient } from '../clients/auth.client';
import { UserClient } from '../clients/user.client';

type ApiFixtures = {
    authClient: AuthClient;
    userClient: UserClient
};

export const test = base.extend<ApiFixtures>({
    authClient: async ({ }, use) => {
        const authClient = new AuthClient();
        await use(authClient);
    },

    userClient: async ({ }, use) => {
        const userClient = new UserClient();
        await use(userClient);
    },
});

export { expect } from '@playwright/test';
import { randomUUID } from "crypto";
import { ApiSuccessResponseSchema } from "../schemas/common.schemas";
import { SchemaValidator } from "./schemaValidator";
import { UserClient } from "../clients/user.client";
import { expect } from "@playwright/test";

export function generateUniqueEmail(prefix = 'test-user'): string {
    return `${prefix}.${Math.random()
        .toString(36)
        .substring(2, 8)}@example.com`
}

export function generateEmailWithLength(length: number): string {
    const domain = '@example.com';
    const localPartLength = length - domain.length;

    if (localPartLength <= 0) {
        throw new Error(`Invalid email length: ${length}`);
    }

    const unique = randomUUID().replace(/-/g, '');

    const localPart = unique
        .padEnd(localPartLength, 'a')
        .slice(0, localPartLength);

    return `${localPart}${domain}`;
}

async function createDisposableUser(userClient: UserClient): Promise<string> {
    const response = await userClient.postUser({
        email: generateUniqueEmail(),
        firstName: 'Delete',
        lastName: 'Test',
    });

    expect(response.status).toBe(201);

    await SchemaValidator.validate(
        ApiSuccessResponseSchema,
        response.data,
        'POST /v1/users - Create disposable user',
    );

    return response.data.data.id;
}
export const getUserByIdPositiveCases = [
    {
        name: '@smoke @C138 @USER-138 should retrieve an existing user by valid ID',
        userId: 'user-demo-001',
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-demo-001',
                },
            },
        },
    },
    {
        name: '@regression @C139 @USER-139 should return the requested user ID',
        userId: 'user-demo-001',
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-demo-001',
                },
            },
        },
    },
    {
        name: '@regression @C140 @USER-140 should return a user with all details populated',
        userId: 'user-demo-001',
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    email: 'qa.put193@example.com',
                    phone: "12345678901",
                    firstName: 'Test',
                    lastName: 'User',
                    kycStatus: 'pending',
                },
            },
        },
    },
    // {
    //     name: '@regression @C141 @USER-141 should return user details when optional fields are absent or null',
    //     userId: 'user-1e596b00',
    //     expected: {
    //         status: 200,
    //         body: {
    //             success: true,
    //             data: {
    //                 id: 'user-1e596b00',
    //                 address: {
    //                     line2: null,
    //                 },
    //             },
    //         },
    //     },
    // },
];

export const getUserByIdNegativeCases = [
    {
        name: '@regression @C142 @USER-142 should return 404 for a non-existent user ID',
        userId: 'user-not-found-999',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'user-not-found-999' not found",
                },
            },
        },
    },
    {
        name: '@regression @C143 @USER-143 should handle an ID containing one space',
        userId: ' ',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20' not found",
                },
            },
        },
    },
    {
        name: '@edge @C144 @USER-144 should handle an ID containing only spaces',
        userId: '   ',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20%20%20' not found",
                },
            },
        },
    },
    {
        name: '@edge @C145 @USER-145 should handle an ID with leading spaces',
        userId: ' user-demo-001',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20user-demo-001' not found",
                },
            },
        },
    },
    {
        name: '@edge @C146 @USER-146 should handle an ID with trailing spaces',
        userId: 'user-demo-001 ',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'user-demo-001%20' not found",
                },
            },
        },
    },
    {
        name: '@regression @C147 @USER-147 should handle an ID containing special characters',
        userId: 'user@demo#1',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'user%40demo%231' not found",
                },
            },
        },
    },
    {
        name: '@regression @C148 @USER-148 should handle an ID containing URL-reserved characters',
        userId: 'user%2Fdemo',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'user%252Fdemo' not found",
                },
            },
        },
    },
    {
        name: '@edge @C149 @USER-149 should handle an ID containing Unicode characters',
        userId: '用户-001',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%E7%94%A8%E6%88%B7-001' not found",
                },
            },
        },
    },
    {
        name: '@edge @C150 @USER-150 should handle an ID exceeding the supported maximum length',
        userId: `user-${'a'.repeat(256)}`,
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `User with ID 'user-${'a'.repeat(256)}' not found`,
                },
            },
        },
    },
    {
        name: '@regression @C151 @USER-151 should treat user IDs as case-sensitive',
        userId: 'USER-DEMO-001',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'USER-DEMO-001' not found",
                },
            },
        },
    },
    {
        name: '@edge @C152 @USER-152 should handle a numeric-string ID',
        userId: '123456',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '123456' not found",
                },
            },
        },
    },
    {
        name: '@regression @C164 @USER-164 should return an error response matching the 404 schema',
        userId: 'user-not-found-999',
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                },
            },
        },
    },
];

export const getUserByIdAuthenticationCases = [
    {
        name: '@security @C153 @USER-153 should reject a request when credentials are missing',
        userId: 'user-demo-001',
        authType: 'missing',
        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'MISSING_AUTHENTICATION',
                    message: 'Authentication required. Provide API Key, Bearer token, Basic auth credentials, or session cookie.',
                },
            },
        },
    },
    {
        name: '@security @C154 @USER-154 should reject invalid credentials',
        userId: 'user-demo-001',
        authType: 'invalid',
        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_API_KEY',
                    message: 'The provided API key is invalid.',
                },
            },
        },
    },
    {
        name: '@security @C155 @USER-155 should reject an empty API key',
        userId: 'user-demo-001',
        authType: 'empty',
        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'MISSING_AUTHENTICATION',
                    message: 'Authentication required. Provide API Key, Bearer token, Basic auth credentials, or session cookie.',
                },
            },
        },
    },
];

export const getUserByIdSchemaCases = [
    {
        name: '@regression @C162 @USER-162 should return a successful response matching the schema',
        userId: 'user-demo-001',
        validation: 'successSchema',
    },
    {
        name: '@regression @C163 @USER-163 should return valid user and nested address data types',
        userId: 'user-demo-001',
        validation: 'userAndAddressTypes',
    },
    {
        name: '@regression @C165 @USER-165 should return response metadata and API version',
        userId: 'user-demo-001',
        validation: 'metadata',
    },
    {
        name: '@regression @C166 @USER-166 should return an ISO 8601 response timestamp',
        userId: 'user-demo-001',
        validation: 'timestamp',
    },
];
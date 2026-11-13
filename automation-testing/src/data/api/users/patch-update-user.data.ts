export const patchUserCases = [
    {
        name: '@regression @C194 @USER-194 should update an existing user with a single field',
        userId: 'user-3c10661d',
        payload: { firstName: 'Patch194' },
        expected: {
            status: 200,
            body: { success: true, data: { firstName: 'Patch194' } },
        },
    },
    {
        name: '@regression @C195 @USER-195 should leave fields not included in the payload unchanged',
        userId: 'user-dcedad29',
        payload: { firstName: 'Patch195' },
        expected: {
            status: 200,
            body: { success: true, data: { firstName: 'Patch195' } },
        },
    },
    {
        name: '@regression @C196 @USER-196 should update multiple submitted fields',
        userId: 'user-a5093999',
        payload: { firstName: 'Patch196', lastName: 'User196' },
        expected: {
            status: 200,
            body: {
                success: true,
                data: { firstName: 'Patch196', lastName: 'User196' },
            },
        },
    },
    {
        name: '@regression @C197 @USER-197 should update only the email field',
        userId: 'user-73cc162f',
        payload: { email: 'qa.patch197@example.com' },
        expected: {
            status: 200,
            body: { success: true, data: { email: 'qa.patch197@example.com' } },
        },
    },
    {
        name: '@regression @C198 @USER-198 should update only a nested address field',
        userId: 'user-024638a5',
        payload: { address: { line1: '2 Updated Street' } },
        expected: {
            status: 200,
            body: {
                success: true,
                data: { address: { line1: '2 Updated Street' } },
            },
        },
    },
    {
        name: '@regression @C199 @USER-199 should accept phone set to null',
        userId: 'user-d93ac0ac',
        payload: { phone: null },
        expected: {
            status: 200,
            body: { success: true, data: { phone: null } },
        },
    },
    {
        name: '@regression @C200 @USER-200 should accept a 10-digit phone number',
        userId: 'user-32cbcbc1',
        payload: { phone: '1234567890' },
        expected: {
            status: 200,
            body: { success: true, data: { phone: '1234567890' } },
        },
    },
    {
        name: '@regression @C201 @USER-201 should accept a 15-digit phone number',
        userId: 'user-f74b8fad',
        payload: { phone: '123456789012345' },
        expected: {
            status: 200,
            body: { success: true, data: { phone: '123456789012345' } },
        },
    },
    {
        name: '@regression @C202 @USER-202 should reject a phone number shorter than 10 digits',
        userId: 'user-7f0ecb8a',
        payload: { phone: '123456789' },
        expected: {
            status: 400,
            body: { success: false, error: { code: 'VALIDATION_ERROR' } },
        },
    },
    {
        name: '@regression @C203 @USER-203 should reject a phone number longer than 15 digits',
        userId: 'user-3811d05c',
        payload: { phone: '1234567890123456' },
        expected: {
            status: 400,
            body: { success: false, error: { code: 'VALIDATION_ERROR' } },
        },
    },
    {
        name: '@regression @C204 @USER-204 should reject phone containing non-digit characters',
        userId: 'user-a30b4fa9',
        payload: { phone: '123456789a' },
        expected: {
            status: 400,
            body: { success: false, error: { code: 'VALIDATION_ERROR' } },
        },
    },
    {
        name: '@regression @C205 @USER-205 should reject an invalid email format',
        userId: 'user-e5777ea3',
        payload: { email: 'not-an-email' },
        expected: {
            status: 400,
            body: { success: false, error: { code: 'VALIDATION_ERROR' } },
        },
    },
    {
        name: '@regression @C206 @USER-206 should reject numeric firstName',
        userId: 'user-9f2643f4',
        payload: { firstName: 123 },
        expected: {
            status: 400,
            body: { success: false, error: { code: 'VALIDATION_ERROR' } },
        },
        bug: 'API may accept a numeric firstName; verify against the observed response',
    },
    {
        name: '@regression @C207 @USER-207 should reject an empty update payload',
        userId: 'user-718fdce3',
        payload: {},
        expected: {
            status: 400,
            body: { success: false, error: { code: 'INVALID_REQUEST' } },
        },
    },
    {
        name: '@regression @C208 @USER-208 should return 404 for a non-existent user ID',
        userId: 'invalid-user-id',
        payload: { firstName: 'Patch208' },
        expected: {
            status: 404,
            body: { success: false, error: { code: 'NOT_FOUND' } },
        },
    },
    {
        name: '@regression @C209 @USER-209 should return 404 for an invalid user ID',
        userId: 'invalid-user-id',
        payload: { firstName: 'Patch209' },
        expected: {
            status: 404,
            body: { success: false, error: { code: 'NOT_FOUND' } },
        },
    },
    {
        name: '@regression @C210 @USER-210 should return the requested user ID',
        userId: 'user-d8f8975b',
        payload: { firstName: 'Patch210' },
        expected: {
            status: 200,
            body: {
                success: true,
                data: { id: 'user-d8f8975b' },
            },
        },
    },
    {
        name: '@regression @C211 @USER-211 should keep createdAt unchanged after update',
        userId: 'user-54fb6296',
        payload: { firstName: 'Patch211' },
        expected: {
            status: 200,
            body: { success: true },
        },
    },
    {
        name: '@regression @C212 @USER-212 should update updatedAt after the request',
        userId: 'user-a059e310',
        payload: { firstName: 'Patch212' },
        expected: {
            status: 200,
            body: { success: true },
        },
    },
    {
        name: '@regression @C213 @USER-213 should return a successful response matching the schema',
        userId: 'user-8192e921',
        payload: { firstName: 'Patch213' },
        expected: {
            status: 200,
            body: { success: true },
        },
    },
    {
        name: '@regression @C214 @USER-214 should return valid user and nested address data types',
        userId: 'user-7723a578',
        payload: { address: { city: 'Pune' } },
        expected: {
            status: 200,
            body: { success: true },
        },
    },
    {
        name: '@regression @C215 @USER-215 should return response metadata and API version',
        userId: 'user-a75ad1d1',
        payload: { firstName: 'Patch215' },
        requestId: 'test-patch-215',
        expected: {
            status: 200,
            body: { success: true },
        },
    },
    // {
    //     name: '@regression @C216 @USER-216 should propagate a custom X-Request-Id',
    //     userId: 'user-ad769b32',
    //     payload: { firstName: 'Patch216' },
    //     requestId: 'test-patch-216',
    //     expected: {
    //         status: 200,
    //         body: {
    //             success: true,
    //             meta: { requestId: 'test-patch-216' },
    //         },
    //     },
    // },
]
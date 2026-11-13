const defaultAddress = {
    line1: '123 Main Street',
    line2: 'Apartment 2',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'IN',
};

const fullPutPayload = (
    email: string,
    overrides: Record<string, unknown> = {},
) => ({
    email,
    phone: '12345678901',
    firstName: 'Test',
    lastName: 'User',
    kycStatus: 'pending',
    address: { ...defaultAddress },
    ...overrides,
});

// ===== 1. Successful Updates =====
export const putUserPositiveCases = [
    {
        name: '@smoke @C168 @USER-168 should update a user with a valid full payload',
        userId: 'user-8a6f1847',
        payload: fullPutPayload('qa.put168@example.com'),
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    email: 'qa.put168@example.com',
                    phone: '12345678901',
                    firstName: 'Test',
                    lastName: 'User',
                    kycStatus: 'pending',
                    address: { ...defaultAddress },
                },
            },
        },
    },
    {
        name: '@regression @C169 @USER-169 should return the requested user ID',
        userId: 'user-1f14be65',
        payload: fullPutPayload('qa.put169@example.com'),
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-1f14be65',
                },
            },
        },
    },
    {
        name: '@regression @C170 @USER-170 should update all submitted user fields',
        userId: 'user-4c3ae2bd',
        payload: fullPutPayload('qa.put170@example.com', {
            address: {
                line1: '456 Updated Street',
                line2: 'Suite 3',
                city: 'Delhi',
                state: 'Delhi',
                postalCode: '110001',
                country: 'IN',
            },
        }),
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    email: 'qa.put170@example.com',
                    phone: '12345678901',
                    firstName: 'Test',
                    lastName: 'User',
                    address: {
                        line1: '456 Updated Street',
                        line2: 'Suite 3',
                        city: 'Delhi',
                        state: 'Delhi',
                        postalCode: '110001',
                        country: 'IN',
                    },
                },
            },
        },
    },
];

// ===== 2. Timestamp Cases =====
export const putUserTimestampCases = [
    {
        name: '@regression @C171 @USER-171 should keep createdAt unchanged after the update',
        userId: 'user-3a2f4836',
        payload: fullPutPayload('qa.put171@example.com'),
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
    {
        name: '@regression @C172 @USER-172 should update updatedAt after the request',
        userId: 'user-80fc1245',
        payload: fullPutPayload('qa.put172@example.com'),
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
];

// ===== 3. Required Field and Email Validation =====
export const putUserRequiredFieldCases = [
    {
        name: '@regression @C173 @USER-173 should reject a payload with email missing',
        userId: 'user-56d5414c',
        payload: {
            firstName: 'Test',
            lastName: 'User',
            phone: '12345678901',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'email',
                        },
                    ],
                },
            },
        },
    },
    {
        name: '@regression @C174 @USER-174 should reject a payload with firstName missing',
        userId: 'user-de1d1d9f',
        payload: {
            email: 'qa.put174@example.com',
            lastName: 'User',
            phone: '12345678901',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'firstName',
                        },
                    ],
                },
            },
        },
    },
    {
        name: '@regression @C175 @USER-175 should reject a payload missing email and firstName',
        userId: 'user-b353dd3b',
        payload: {
            lastName: 'User',
            phone: '12345678901',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'email',
                        },
                        {
                            field: 'firstName',
                        },
                    ],
                },
            },
        },
    },
    {
        name: '@regression @C176 @USER-176 should reject an invalid email format',
        userId: 'user-07329862',
        payload: fullPutPayload('not-an-email'),
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'email',
                        },
                    ],
                },
            },
        },
    },
];

// ===== 4. Phone Validation =====
export const putUserPhoneCases = [
    {
        name: '@regression @C177 @USER-177 should accept a phone number containing exactly 10 digits',
        userId: 'user-bed60d54',
        payload: fullPutPayload('qa.put177@example.com', {
            phone: '1234567890',
        }),
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    phone: '1234567890',
                },
            },
        },
    },
    {
        name: '@regression @C178 @USER-178 should accept a phone number containing exactly 15 digits',
        userId: 'user-f3637ef8',
        payload: fullPutPayload('qa.put178@example.com', {
            phone: '123456789012345',
        }),
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    phone: '123456789012345',
                },
            },
        },
    },
    {
        name: '@regression @C179 @USER-179 should reject a phone number below the allowed length',
        userId: 'user-3b97e079',
        payload: fullPutPayload('qa.put179@example.com', {
            phone: '123456789',
        }),
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'phone',
                        },
                    ],
                },
            },
        },
    },
    {
        name: '@regression @C180 @USER-180 should reject a phone number above the allowed length',
        userId: 'user-aac96281',
        payload: fullPutPayload('qa.put180@example.com', {
            phone: '1234567890123456',
        }),
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'phone',
                        },
                    ],
                },
            },
        },
    },
    {
        name: '@regression @C181 @USER-181 should reject a phone number containing non-digit characters',
        userId: 'user-99359044',
        payload: fullPutPayload('qa.put181@example.com', {
            phone: '123456789a',
        }),
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'phone',
                        },
                    ],
                },
            },
        },
    },
];

// ===== 5. Data Type Validation =====
export const putUserDataTypeCases = [
    {
        name: '@regression @C182 @USER-182 should reject a numeric firstName',
        userId: 'user-eaf9d72a',
        payload: fullPutPayload('qa.put182@example.com', {
            firstName: 123,
        }),
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: [
                        {
                            field: 'firstName',
                        },
                    ],
                },
            },
        },
        bug: 'Numeric firstName is currently accepted by the API',
    },
];

// ===== 6. Omitted Fields =====
export const putUserOmittedFieldCases = [
    {
        name: '@regression @C183 @USER-183 should use the default KYC status when kycStatus is omitted',
        userId: 'user-27cfc505',
        payload: {
            email: 'qa.put183@example.com',
            phone: '12345678901',
            firstName: 'Test',
            lastName: 'User',
            address: { ...defaultAddress },
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
    {
        name: '@regression @C184 @USER-184 should return phone as null when phone is omitted',
        userId: 'user-564601fa',
        payload: {
            email: 'qc.put184@example.com',
            firstName: 'Test',
            lastName: 'User',
            kycStatus: 'pending',
            address: { ...defaultAddress },
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    phone: null,
                },
            },
        },
    },
    {
        name: '@regression @C185 @USER-185 should return lastName as null when lastName is omitted',
        userId: 'user-db9d8b35',
        payload: {
            email: 'qa.put185@example.com',
            phone: '12345678901',
            firstName: 'Test',
            kycStatus: 'pending',
            address: { ...defaultAddress },
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
    {
        name: '@regression @C186 @USER-186 should handle an omitted address',
        userId: 'user-8ddad004',
        payload: {
            email: 'qa.put186@example.com',
            phone: '12345678901',
            firstName: 'Test',
            lastName: 'User',
            kycStatus: 'pending',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
    {
        name: '@regression @C187 @USER-187 should omit an incomplete address from the response',
        userId: 'user-cfaf9f53',
        payload: {
            email: 'qa.put187@example.com',
            phone: '12345678901',
            firstName: 'Test',
            lastName: 'User',
            address: {
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
];

// ===== 7. User ID Validation =====
export const putUserNotFoundCases = [
    {
        name: '@regression @C188 @USER-188 should return 404 for a non-existent user ID',
        userId: 'invalid-user-id',
        payload: fullPutPayload('qa.put188@example.com'),
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
    {
        name: '@regression @C189 @USER-189 should return 404 for an invalid user ID',
        userId: 'invalid-user-id',
        payload: fullPutPayload('qa.put189@example.com'),
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

// ===== 8. Response Schema and Metadata =====
export const putUserSchemaCases = [
    {
        name: '@regression @C190 @USER-190 should return a successful response matching the schema',
        userId: 'user-22d376a2',
        payload: fullPutPayload('qa.put190@example.com'),
        validation: 'successSchema',
    },
    {
        name: '@regression @C191 @USER-191 should return valid user and nested address data types',
        userId: 'user-903954d1',
        payload: fullPutPayload('qa.put191@example.com'),
        validation: 'userAndAddressTypes',
    },
    {
        name: '@regression @C192 @USER-192 should return response metadata and API version',
        userId: 'user-bc72249c',
        payload: fullPutPayload('qa.put192@example.com'),
        requestId: 'test-put-192',
        validation: 'metadata',
    },
];

// ===== 9. Request ID =====
export const putUserRequestIdCase = {
    name: '@regression @C193 @USER-193 should propagate a custom X-Request-Id',
    userId: 'user-fd43a432',
    payload: fullPutPayload('qc.put193@example.com'),
    requestId: 'test-put-193',
    expected: {
        status: 200,
        body: {
            success: true,
            data: {
                id: 'user-fd43a432',
            },
            meta: {
                requestId: 'test-put-193',
            },
        },
    },
};
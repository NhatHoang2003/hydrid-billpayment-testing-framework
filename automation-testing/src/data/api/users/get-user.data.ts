export const generalCases = [
    {
        name: '@smoke @C001 @USER-GET-001 should get users with default parameters',
        params: {},
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    version: 'v1',
                    pagination: {
                        page: 1,
                        limit: 10,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C004 @USER-GET-004 should get users with page and limit',
        params: {
            page: 2,
            limit: 15,
        },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 2,
                        limit: 15,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C005 @USER-GET-005 should combine all valid params',
        params: {
            page: 1,
            limit: 10,
            kyc_status: 'verified',
            search: '',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 10,
                    },
                },
            },
        },
    },
];

export const pageCases = [
    {
        name: '@regression @C002 @USER-GET-002 should get users with page only',
        params: { page: 2 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 2,
                        limit: 10,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C006 @USER-GET-006 should accept min boundary page (page = 1)',
        params: { page: 1 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 10,
                        hasPrev: false,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C011 @USER-GET-011 should reject page = 0',
        params: { page: 0 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },

    {
        name: '@regression @C012 @USER-GET-012 should reject negative page (page = -1)',
        params: { page: -1 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },

    {
        name: '@regression @C013 @USER-GET-013 should reject decimal page (page = 1.5)',
        params: { page: 1.5 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },

    {
        name: '@regression @C014 @USER-GET-014 should reject non-numeric string page (page = "abc")',
        params: { page: 'abc' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-500',
    },

    {
        name: '@regression @C015 @USER-GET-015 should handle empty string page (page = "")',
        params: { page: '' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },

    {
        name: '@regression @C016 @USER-GET-016 should reject page exceeding max safe integer',
        params: { page: 9007199254740992 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },

    {
        name: '@regression @C017 @USER-GET-017 should reject page as boolean true',
        params: { page: true },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-500',
    },

    {
        name: '@regression @C018 @USER-GET-018 should reject page as array',
        params: { page: [1, 2] },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-PAGE-VALIDATION-RETURNS-200',
    },
];

export const limitCases = [
    {
        name: '@regression @C003 @USER-GET-003 should get users with limit only',
        params: { limit: 20 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 20,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C019 @USER-GET-019 should accept min limit (limit = 1)',
        params: { limit: 1 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 1,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C020 @USER-GET-020 should accept normal limit (limit = 50)',
        params: { limit: 50 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 50,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C021 @USER-GET-021 should accept max limit boundary (limit = 100)',
        params: { limit: 100 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 100,
                    },
                },
            },
        },
    },

    {
        name: '@regression @C022 @USER-GET-022 should reject limit just over max (limit = 101)',
        params: { limit: 101 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-022-RETURNS-200',
    },

    {
        name: '@regression @C023 @USER-GET-023 should reject limit = 0',
        params: { limit: 0 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-023-RETURNS-200',
    },

    {
        name: '@regression @C024 @USER-GET-024 should reject negative limit (limit = -10)',
        params: { limit: -10 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-024-RETURNS-200',
    },

    {
        name: '@regression @C025 @USER-GET-025 should reject decimal limit (limit = 10.5)',
        params: { limit: 10.5 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-025-RETURNS-200',
    },

    {
        name: '@regression @C026 @USER-GET-026 should reject string limit (limit = "ten")',
        params: { limit: 'ten' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-026-RETURNS-500',
    },

    {
        name: '@regression @C027 @USER-GET-027 should reject limit with empty string',
        params: { limit: '' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-027-RETURNS-200',
    },

    {
        name: '@regression @C028 @USER-GET-028 should reject limit exceeding integer bounds',
        params: { limit: 9999999999 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-028-RETURNS-200',
    },

    {
        name: '@regression @C029 @USER-GET-029 should reject limit as array',
        params: { limit: [10, 20] },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-029-RETURNS-200',
    },

    {
        name: '@regression @C030 @USER-GET-030 should reject limit as boolean',
        params: { limit: false },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
        bug: 'BUG-USER-GET-030-RETURNS-500',
    },
];

export const kycStatusCases = [
    {
        name: '@regression @C031 @USER-GET-031 should reject invalid enum value (kyc_status = "approved")',
        params: {
            kyc_status: 'approved',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
        bug: 'BUG-USER-GET-031-RETURNS-200',
    },

    {
        name: '@regression @C032 @USER-GET-032 should reject uppercase enum (kyc_status = "VERIFIED")',
        params: {
            kyc_status: 'VERIFIED',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
        bug: 'BUG-USER-GET-032-RETURNS-200',
    },

    {
        name: '@regression @C033 @USER-GET-033 should reject numeric kyc_status (kyc_status = 1)',
        params: {
            kyc_status: 1,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_TYPE',
                    message: 'kyc_status must be a string',
                },
            },
        },
        bug: 'BUG-USER-GET-033-RETURNS-200',
    },

    {
        name: '@regression @C034 @USER-GET-034 should reject empty kyc_status string',
        params: {
            kyc_status: '',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
        bug: 'BUG-USER-GET-034-RETURNS-200',
    },

    {
        name: '@regression @C035 @USER-GET-035 should reject array of kyc_status',
        params: {
            kyc_status: ['pending', 'verified'],
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_TYPE',
                    message: 'kyc_status must be a single string',
                },
            },
        },
        bug: 'BUG-USER-GET-035-RETURNS-200',
    },
];

export const searchCases = [

    {
        name: '@regression @C036 @USER-GET-036 should find user by full name',
        params: {
            search: 'Nguyễn Văn A',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [
                    {
                        firstName: 'Nguyễn Văn A',
                        lastName: null,
                    },
                ],
            },
        },
    },

    {
        name: '@regression @C037 @USER-GET-037 should find user by partial name',
        params: {
            search: 'Nguyễn Văn',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C038 @USER-GET-038 should find user by name keyword',
        params: {
            search: 'Nguyễn',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C039 @USER-GET-039 should return empty result for non-existing name',
        params: {
            search: 'Nguyễn Văn B',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
            },
        },
    },

    {
        name: '@regression @C040 @USER-GET-040 should find user by full email',
        params: {
            search: 'hoang@gmail.com',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [
                    {
                        email: 'hoang@gmail.com',
                    },
                ],
            },
        },
    },

    {
        name: '@regression @C041 @USER-GET-041 should find user by partial email',
        params: {
            search: 'hoang',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C042 @USER-GET-042 should find user by email domain',
        params: {
            search: 'gmail.com',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C044 @USER-GET-044 should find user by phone number without plus sign',
        params: {
            search: '84394267205',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C045 @USER-GET-045 should find user by partial phone number',
        params: {
            search: '394267205',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    // Edge
    {
        name: '@regression @C046 @USER-GET-046 should handle empty search',
        params: {
            search: '',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: '@regression @C047 @USER-GET-047 should handle case-insensitive search',
        params: {
            search: 'NGUYỄN VĂN A',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
];
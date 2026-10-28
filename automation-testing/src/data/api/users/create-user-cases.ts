import { generateEmailWithLength, generateUniqueEmail } from '../../../helpers/testDataGenerator';

// ===== 1. Minimal User =====
export const miniUserPositiveCases = [
    {
        name: '@regression @C053 @USER-053 should create mini user with required fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    lastName: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C054 @USER-054 should create mini user with all minimal fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            lastName: 'User',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C055 @USER-055 should create mini user with firstName at maximum length (255 characters)',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'A'.repeat(255),
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    firstName: 'A'.repeat(255),
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C056 @USER-056 should create mini user with special characters in firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: "Anne-Marie O'Neil",
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    firstName: "Anne-Marie O'Neil",
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C057 @USER-057 should create mini user with unicode characters in firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Nguyễn Ánh',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    firstName: 'Nguyễn Ánh',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C058 @USER-058 should create mini user with null lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            lastName: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    lastName: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C059 @USER-059 should create mini user with empty lastName (stored as null)',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            lastName: '',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    lastName: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C071 @USER-071 should create mini user with numeric firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 12345,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
        bug: 'SPEC-PENDING-071',
    },
];

export const miniUserNegativeCases = [
    {
        name: '@regression @C060 @USER-060 should reject missing email',
        payload: {
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C061 @USER-061 should reject missing firstName',
        payload: {
            email: generateUniqueEmail(),
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C062 @USER-062 should reject invalid email format',
        payload: {
            email: 'invalid-email',
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C063 @USER-063 should reject empty email',
        payload: {
            email: '',
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C065 @USER-065 should reject empty firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: '',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C066 @USER-066 should reject null email',
        payload: {
            email: null,
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C067 @USER-067 should reject null firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: null,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C068 @USER-068 should reject email exceeding maximum length',
        payload: {
            email: generateEmailWithLength(256),
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'MAX_LENGTH',
                            message: 'email must not exceed 255 characters',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-MAX-LENGTH-VALIDATION-RETURNS-201',
    },

    {
        name: '@regression @C069 @USER-069 should reject firstName exceeding maximum length',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'A'.repeat(256),
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'MAX_LENGTH',
                            message: 'firstName must not exceed 255 characters',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-MAX-LENGTH-VALIDATION-RETURNS-201',
    },

    {
        name: '@regression @C070 @USER-070 should reject non-string email',
        payload: {
            email: 12345,
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C072 @USER-072 should reject array firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: [],
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'INVALID_FORMAT',
                            message: 'firstName must be a string',
                        },
                    ],
                },
            },
        },
        bug: 'SPEC-PENDING-072',
    },

    {
        name: '@regression @C073 @USER-073 should reject boolean firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: false,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C074 @USER-074 should reject non-string lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            lastName: 123,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'lastName',
                            code: 'INVALID_FORMAT',
                            message: 'lastName must be a string',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-LASTNAME-TYPE-VALIDATION-RETURNS-201',
    },

    {
        name: '@regression @C075 @USER-075 should reject empty request body',
        payload: {},
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C076 @USER-076 should reject malformed JSON when firstName has no value',
        payload: `{
            "email": "test076@example.com",
            "firstName": ,
            "lastName": "User"
        }`,
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_JSON',
                    message: 'Malformed JSON.',
                },
            },
        },
        bug: 'BUG-MALFORMED-JSON-RETURNS-500',
    },
];

// ===== 2. Full Details =====
export const detailUserPositiveCases = [
    {
        name: '@regression @C077 @USER-077 should create detail user with complete user details',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C078 @USER-078 should create detail user with null optional fields',
        payload: {
            email: generateUniqueEmail(),
            phone: null,
            firstName: 'New',
            lastName: null,
            kycStatus: null,
            address: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    lastName: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C079 @USER-079 should apply default kycStatus when kycStatus is missing',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C080 @USER-080 should create detail user with verified kycStatus',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'verified',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'verified',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C081 @USER-081 should create detail user with rejected kycStatus',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'rejected',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'rejected',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C082 @USER-082 should create detail user with partial address details',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                city: 'Mumbai',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C083 @USER-083 should create detail user with unicode characters in user details and address',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'Nguyễn',
            lastName: 'Ánh',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Hà Nội',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    firstName: 'Nguyễn',
                    lastName: 'Ánh',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C084 @USER-084 should accept empty phone',
        payload: {
            email: generateUniqueEmail(),
            phone: '',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C085 @USER-085 should create detail user with null phone',
        payload: {
            email: generateUniqueEmail(),
            phone: null,
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C086 @USER-086 should apply default kycStatus when kycStatus is empty',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: '',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C087 @USER-087 should apply default kycStatus when kycStatus is null',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: null,
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C088 @USER-088 should create detail user with null address',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C089 @USER-089 should accept empty address object',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {},
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C090 @USER-090 should create detail user with address containing line1 only',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C091 @USER-091 should accept address without line1',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C092 @USER-092 should create detail user with address without city',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C093 @USER-093 should create detail user with address without state',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C094 @USER-094 should create detail user with address without postalCode',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C095 @USER-095 should apply default country when address.country is missing',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    address: {
                        country: 'IN',
                    },
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C099 @USER-099 should accept address supplied as a string',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: '123 Main Street',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const detailUserNegativeCases = [
    {
        name: '@regression @C096 @USER-096 should reject unsupported kycStatus',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'approved',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C097 @USER-097 should reject numeric phone',
        payload: {
            email: generateUniqueEmail(),
            phone: 919876543210,
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
        bug: 'BUG-PHONE-VALIDATION-RETURNS-500',
    },

    {
        name: '@regression @C098 @USER-098 should reject invalid phone format',
        payload: {
            email: generateUniqueEmail(),
            phone: 'invalid-phone',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C100 @USER-100 should reject malformed JSON when phone has no value',
        payload: `{
            "email": "test100@example.com",
            "phone": ,
            "firstName": "New"
        }`,
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_JSON',
                    message: 'Malformed JSON.',
                },
            },
        },
        bug: 'BUG-MALFORMED-JSON-RETURNS-500',
    },

    {
        name: '@regression @C101 @USER-101 should reject malformed JSON with missing closing brace',
        payload: `{
            "email": "test101@example.com",
            "phone": "+919876543210",
            "firstName": "New",
            "address": {"line1": "123 Main Street"}`,
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_JSON',
                    message: 'Malformed JSON.',
                },
            },
        },
        bug: 'BUG-MALFORMED-JSON-RETURNS-500',
    },

    {
        name: '@regression @C102 @USER-102 should reject boolean phone',
        payload: {
            email: generateUniqueEmail(),
            phone: true,
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid phone data type.',
                },
            },
        },
        bug: 'BUG-PHONE-VALIDATION-RETURNS-500',
    },
];

// ===== 4. Extended Validation =====
export const emailValidationCases = [
    {
        name: '@regression @C110 @USER-110 should reject email with leading spaces',
        payload: {
            email: ` ${generateUniqueEmail()}`,
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C111 @USER-111 should reject email with trailing spaces',
        payload: {
            email: `${generateUniqueEmail()} `,
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: '@regression @C112 @USER-112 should create user with uppercase email',
        payload: {
            email: generateUniqueEmail().toUpperCase(),
            firstName: 'New',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C113 @USER-113 should create user with unicode email',
        payload: {
            email: `tést${Date.now()}@example.com`,
            firstName: 'New',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C114 @USER-114 should reject email containing multiple @ symbols',
        payload: {
            email: 'test@@example.com',
            firstName: 'New',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-EMAIL-VALIDATION-RETURNS-201',
    },
];

// ===== 5. Phone Validation =====
export const phoneValidationCases = [
    {
        name: '@regression @C115 @USER-115 should reject phone below allowed length',
        payload: {
            email: generateUniqueEmail(),
            phone: '+91987',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C116 @USER-116 should reject phone above allowed length',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210123456789',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C117 @USER-117 should reject phone containing letters',
        payload: {
            email: generateUniqueEmail(),
            phone: '+91abc1234567',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C118 @USER-118 should reject phone containing unsupported special characters',
        payload: {
            email: generateUniqueEmail(),
            phone: '+91!@#$%^',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: '@regression @C119 @USER-119 should accept phone number with leading and trailing spaces',
        payload: {
            email: generateUniqueEmail(),
            phone: ' +919876543210 ',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

// ===== 6. Name Validation =====
export const nameValidationCases = [
    {
        name: '@regression @C120 @USER-120 should accept whitespace-only firstName',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: '   ',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C121 @USER-121 should accept firstName with leading spaces',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: ' New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C122 @USER-122 should accept firstName with trailing spaces',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New ',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C123 @USER-123 should accept whitespace-only lastName',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: '   ',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C124 @USER-124 should create user with special characters in lastName',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: "O'Neil-@",
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                    lastName: "O'Neil-@",
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

// ===== 7. Address Validation =====
export const addressValidationCases = [
    {
        name: '@regression @C125 @USER-125 should accept numeric address.line1',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: 123,
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C126 @USER-126 should accept boolean address.city',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: true,
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C127 @USER-127 should reject array address.state',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: ['Maharashtra'],
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid address.state data type.',
                },
            },
        },
        bug: 'BUG-ADDRESS-VALIDATION-RETURNS-500',
    },

    {
        name: '@regression @C128 @USER-128 should accept numeric address.postalCode',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: 400001,
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C129 @USER-129 should reject object address.country',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: {
                    code: 'IN',
                },
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid address.country data type.',
                },
            },
        },
        bug: 'BUG-ADDRESS-VALIDATION-RETURNS-500',
    },

    {
        name: '@regression @C130 @USER-130 should accept boolean address.line2',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: true,
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: '@regression @C131 @USER-131 should accept empty address.line1',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '',
                line2: 'Apartment 2',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];
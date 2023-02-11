export const test = {
  type: 'object',
  additionalProperties: false,
  properties: {
    files: {
      type: 'array',
      items: {
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          media_type: { type: 'number' },
          created_at: { type: 'number' },
          updated_at: { type: 'number' },
          path: { type: 'string' },
          mime: { type: 'string' },
          width: { type: 'number' },
          height: { type: 'number' },
          size: { type: 'number' },
          capture_type: { type: 'number' },
          location: { type: 'string' },
          content_rating: { type: 'number' },
        },
        required: [
          'name',
          'media_type',
          'created_at',
          'updated_at',
          'path',
          'mime',
          'width',
          'height',
          'size',
          'capture_type',
          'location',
          'content_rating',
        ],
      },
    },
  },
  required: ['files'],
};

export const loginSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
};
export const codeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    auth_code: { type: 'string' },
  },
  required: ['email', 'auth_code'],
};

export const refreshTokenSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    refreshToken: { type: 'string' },
  },
  required: ['email', 'refreshToken'],
};

export const registerSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'string', enum: ['admin', 'subscriber', 'customer'] },
  },
  required: ['email', 'password', 'role'],
};

export const forgetPasswordSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
  },
  required: ['email'],
};

export const resetPasswordSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
};

export const changePasswordSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    oldPassword: { type: 'string' },
    newPassword: { type: 'string' },
  },
  required: ['oldPassword', 'newPassword'],
};

export const updateProfileSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    full_name: { type: 'string' },
    phone: { type: 'string' },
    is_active: { type: 'boolean' },
    imageUrl: { type: 'string' },
  },
};

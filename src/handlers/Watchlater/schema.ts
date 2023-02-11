export const addSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    video_id: { type: 'string' },
    user_id: { type: 'string' },
  },
  required: ['video_id', 'user_id'],
};

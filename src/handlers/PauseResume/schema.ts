export const addSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    video_id: { type: 'string' },
    user_id: { type: 'string' },
    duration: { type: 'string' },
  },
  required: ['video_id', 'user_id', 'duration'],
};

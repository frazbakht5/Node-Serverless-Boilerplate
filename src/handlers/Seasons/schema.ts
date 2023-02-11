export const seasonSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    video_id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['video_id', 'title', 'description'],
};

export const seasonUpdaateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    video_id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
  },
};

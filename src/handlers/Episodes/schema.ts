export const episodeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    season_id: { type: 'string' },
    title: { type: 'string' },
    thumbnil: { type: 'string', format: 'uri' },
    episode_url: { type: 'string', format: 'uri' },
    description: { type: 'string' },
  },
  required: ['season_id', 'title', 'description', 'thumbnil', 'episode_url'],
};

export const episodeUpdaateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    season_id: { type: 'string' },
    title: { type: 'string' },
    thumbnil: { type: 'string', format: 'uri' },
    episode_url: { type: 'string', format: 'uri' },
    description: { type: 'string' },
  },
};

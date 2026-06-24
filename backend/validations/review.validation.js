const { z } = require('zod');

const reviewSchema = z.object({
  user_id: z.number(),

  provider_id: z.number(),

  rating: z.number().min(1).max(5),

  comment: z.string()
});

module.exports = reviewSchema;
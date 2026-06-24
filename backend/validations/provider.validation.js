const { z } = require('zod');

const providerSchema = z.object({
  name: z.string().min(3),

  phone: z.string().min(10),

  email: z.string().email(),

  experience_years: z.number(),

  city: z.string(),

  address: z.string(),

  service_type_id: z.number()
});

module.exports = providerSchema;
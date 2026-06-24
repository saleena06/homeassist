const { z } = require('zod');

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters'),

  email: z
    .string()
    .email('Invalid email'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),

  phone: z
    .string()
    .min(10, 'Phone number is required'),

  role: z.enum([
    'customer',
    'provider',
    'admin'
  ])
});

const signInSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(6)
});

module.exports = {
  signUpSchema,
  signInSchema
};
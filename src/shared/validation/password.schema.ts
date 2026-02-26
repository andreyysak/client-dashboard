import { z } from 'zod'

export const passwordSchema = {
  password: z.string().min(8).max(32),
}

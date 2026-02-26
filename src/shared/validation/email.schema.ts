import { z } from 'zod'

export const emailSchema = {
  email: z.email(),
}

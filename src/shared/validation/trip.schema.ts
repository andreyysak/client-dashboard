import { z } from 'zod'

export const getTripSchema = (t: (key: string) => string) =>
  z.object({
    kilometres: z.coerce
      .number()
      .min(1, { message: t('trips.form.error_kilometres_min') }),
    direction: z.string().min(3, { message: t('trips.form.error_direction_min') }),
  })

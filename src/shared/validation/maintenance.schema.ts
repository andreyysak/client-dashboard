import { z } from 'zod'

export const getMaintenanceSchema = (t: (key: string) => string) =>
  z.object({
    odometer: z.coerce
      .number()
      .min(1, { message: t('maintenance.form_error_odometer_min') }),
    description: z
      .string()
      .min(3, { message: t('maintenance.form_error_description_min') }),
    cost: z.coerce.number().optional(),
  })

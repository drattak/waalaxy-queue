import { z } from 'zod';
import { definedActions } from '../data/defined-actions';

export const actionAddSchema = z
  .object({
    id: z.number(),
  })
  .refine(
    (data) => {
      return definedActions.some((action) => action.id === data.id);
    },
    { message: 'Action not found' }
  );

export const actionSchema = z.object({
  id: z.number(),
  creditsMaxValue: z.number(),
  creditsRealValue: z.number(),
  lastUpdatedAt: z.coerce.date(),
});

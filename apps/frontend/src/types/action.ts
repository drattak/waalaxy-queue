import { z } from 'zod';
import { actionAddSchema, actionSchema } from '../schemas/actions';

export type Action = z.infer<typeof actionSchema>;

export type ActionAddSchema = z.infer<typeof actionAddSchema>;

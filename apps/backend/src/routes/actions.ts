import express from 'express';
import { ActionAddSchema } from '../types/action';
import { definedActions } from '../data/defined-actions';
import { actionAddSchema } from '../schemas/actions';

const router = express.Router();

router.post('/running', (req, res) => {
  const runningActions = req.app.get('queue') as ActionAddSchema[];
  try {
    runningActions.push(actionAddSchema.parse(req.body));
    res.json(
      runningActions.map((el) =>
        definedActions.find((action) => action.id === el.id)
      )
    );
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

router.get('/running', (req, res) => {
  const runningActions = req.app.get('queue') as ActionAddSchema[];
  res.json(
    runningActions.map((el) =>
      definedActions.find((action) => action.id === el.id)
    )
  );
});

router.get('/', (req, res) => {
  res.json(definedActions);
});

export default router;

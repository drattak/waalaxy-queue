import express from 'express';
import cors from 'cors';
import actions from './routes/actions';
import { executeAction, initializeActions } from './controllers/action';
import { ActionAddSchema } from './types/action';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const runningActions: ActionAddSchema[] = [];

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/actions', cors(corsOptions), actions);
app.set('queue', runningActions);

app.listen(port, host, () => {
  console.log('Initializing actions...');
  initializeActions();
  setInterval(() => {
    console.log('Starting queue execution...');
    executeAction(app.get('queue'));
  }, 15000);
  console.log(`[ ready ] http://${host}:${port}`);
});

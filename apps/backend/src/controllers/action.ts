import { definedActions } from '../data/defined-actions';
import { Action, ActionAddSchema } from '../types/action';

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

export const initializeActions = () => {
  definedActions.forEach((action) => {
    creditsCalculation(action);
  });
};

const creditsCalculation = (action: Action) => {
  const minCredits = Math.floor(0.8 * action.creditsMaxValue);
  const maxCredits = action.creditsMaxValue;
  action.creditsRealValue =
    Math.floor(Math.random() * (maxCredits - minCredits + 1)) + minCredits;
  action.lastUpdatedAt = new Date();
};

export const creditsUdpdate = (actionId: number) => {
  const now = Date.now();
  const action = definedActions.find(
    (definedAction) => definedAction.id === actionId
  );
  if (!action) return 0;
  if (now - new Date(action.lastUpdatedAt).getTime() >= TEN_MINUTES_IN_MS) {
    creditsCalculation(action);
  }
};

export const executeAction = (runningActions: ActionAddSchema[]) => {
  if (runningActions.length === 0) return;

  const nextAction = runningActions.shift();

  if (!nextAction) {
    console.log('No action to execute.');
    return;
  }
  const action = definedActions.find(
    (definedAction) => definedAction.id === nextAction.id
  );

  if (!action) {
    console.log('No action found.');
    return;
  }
  creditsUdpdate(nextAction.id);

  if (action.creditsRealValue > 0) {
    action.creditsRealValue -= 1;
    console.log(
      `Executed action ${nextAction.id}. Remaining credits: ${action.creditsRealValue} of ${action.creditsMaxValue}.`
    );
  } else {
    console.log(`No credits left for action ${nextAction.id}.`);
    runningActions.push(nextAction);
  }
};

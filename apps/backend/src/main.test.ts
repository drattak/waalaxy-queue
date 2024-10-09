import { definedActions } from './data/defined-actions';
import { creditsUdpdate, executeAction, initializeActions } from './controllers/action';
import { ActionAddSchema } from './types/action';

jest.mock('./data/defined-actions', () => ({
  definedActions: [
    {
      id: 1,
      creditsMaxValue: 100,
      creditsRealValue: 0,
      lastUpdatedAt: new Date(),
    },
    {
      id: 2,
      creditsMaxValue: 200,
      creditsRealValue: 0,
      lastUpdatedAt: new Date(),
    },
  ],
}));

describe('Action Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  describe('initializeActions', () => {
    it('should initialize actions with calculated credits and updated timestamp', () => {
      initializeActions();
      definedActions.forEach((action) => {
        expect(action.creditsRealValue).toBeGreaterThanOrEqual(
          Math.floor(0.8 * action.creditsMaxValue)
        );
        expect(action.creditsRealValue).toBeLessThanOrEqual(
          action.creditsMaxValue
        );
        expect(action.lastUpdatedAt).toBeInstanceOf(Date);
      });
    });
  });

  describe('creditsUdpdate', () => {
    it('should update credits if last update was more than 10 minutes ago', () => {
      const actionId = 1;
      definedActions[0].lastUpdatedAt = new Date(Date.now() - 11 * 60 * 1000); // 11 minutes ago
      creditsUdpdate(actionId);
      expect(definedActions[0].creditsRealValue).toBeGreaterThanOrEqual(
        Math.floor(0.8 * definedActions[0].creditsMaxValue)
      );
      expect(definedActions[0].creditsRealValue).toBeLessThanOrEqual(
        definedActions[0].creditsMaxValue
      );
    });

    it('should not update credits if last update was less than 10 minutes ago', () => {
      const actionId = 1;
      definedActions[0].lastUpdatedAt = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      const previousCredits = definedActions[0].creditsRealValue;
      creditsUdpdate(actionId);
      expect(definedActions[0].creditsRealValue).toBe(previousCredits);
    });
  });

  describe('executeAction', () => {
    it('should execute the next action and decrement credits', () => {
      const runningActions: ActionAddSchema[] = [{ id: 1 }];
      definedActions[0].creditsRealValue = 10;
      executeAction(runningActions);
      expect(definedActions[0].creditsRealValue).toBe(9);
      expect(runningActions.length).toBe(0);
    });

    it('should log and push back action if no credits left', () => {
      const runningActions: ActionAddSchema[] = [{ id: 1 }];
      definedActions[0].creditsRealValue = 0;
      console.log = jest.fn();
      executeAction(runningActions);
      expect(console.log).toHaveBeenCalledWith('No credits left for action 1.');
      expect(runningActions.length).toBe(1);
    });

    it('should log if no action found', () => {
      const runningActions: ActionAddSchema[] = [{ id: 999 }];
      console.log = jest.fn();
      executeAction(runningActions);
      expect(console.log).toHaveBeenCalledWith('No action found.');
    });
  });
});

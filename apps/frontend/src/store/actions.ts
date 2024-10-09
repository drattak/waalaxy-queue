import { create } from 'zustand';
import { Action } from '../types/action';

export type ActionsStore = {
  actions: Action[];
  addAction: (action: Action) => void;
  fillActions: (actions: Action[]) => void;
  removeAction: (action: Action) => void;
};

export const useActionsStore = create<ActionsStore>((set) => ({
  actions: [],
  addAction: (action: Action) =>
    set((state: ActionsStore) => ({ actions: [...state.actions, action] })),

  fillActions: (actions: Action[]) =>
    set(() => ({ actions })),
  removeAction: (action: Action) =>
    set((state: ActionsStore) => ({
      actions: state.actions.filter((a: Action) => a !== action),
    })),
}));

import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export const STATUS_KEY = 'status';

export const watch = createAction('[WATCH] watch')
export const open = createAction('[OPEN] open')
export const close = createAction('[CLOSE] close')

export interface statusState {
  status: boolean;
}

export const InitialState: statusState = {
  status: false
}

export const statusReducer = createReducer(
  InitialState,
  on(open,  state => ({
    ...state,
    status: true
  })),
  on(close, state => ({
    status: false
  }))
)

export const featureSelector
   = createFeatureSelector<statusState>(STATUS_KEY)
export const statusSelector = createSelector(
  featureSelector,
  state => state.status
)

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { statusState, statusReducer, STATUS_KEY } from './modal'

export interface State {
  [STATUS_KEY]: statusState,
}

export const reducers: ActionReducerMap<State> = {
  [STATUS_KEY]: statusReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

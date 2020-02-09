import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import {getReducerProp} from '../../utils/helpers'

export const INFO_LOADING = 'PROFILE::INFO_LOADING';
export const INFO_LOADED = 'PROFILE::INFO_LOADED';
export const infoLoading = createAction(INFO_LOADING);
export const infoLoaded = createAction(INFO_LOADED);
export const userLoading = handleActions({
  [infoLoading]: () => ({loadingUser: true}),
  [infoLoaded]: () => ({loadingUser: false}),
}, {
  loadingUser: true,
});
export const LOADING_STATE_NAME = 'loadingUser';
export const REDUCER_LOADING_NAME = 'userLoading';
const loadingSelector = getReducerProp(REDUCER_LOADING_NAME);
export const loadingStateSelector = createSelector(loadingSelector, getReducerProp(LOADING_STATE_NAME));
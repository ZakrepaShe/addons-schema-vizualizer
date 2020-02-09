import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import {getReducerProp} from '../../utils/helpers'

export const SETTINGS_SCHEMA_UPDATED = 'SETTINGS_SCHEMA_UPDATED';
export const updateSettingsSchema = createAction(SETTINGS_SCHEMA_UPDATED);

export const SETTINGS_SCHEMA_PARSED_SUCCESSFULLY = 'SETTINGS_SCHEMA_PARSED_SUCCESSFULLY';
export const changeParsedSchemaStatus = createAction(SETTINGS_SCHEMA_PARSED_SUCCESSFULLY);

export const UPDATE_PARSED_SETTINGS_SCHEMA = 'UPDATE_PARSED_SETTINGS_SCHEMA';
export const updateParsedSchema = createAction(UPDATE_PARSED_SETTINGS_SCHEMA);

export const settingsSchema = handleActions({
  [updateSettingsSchema]: (state, { payload }) => ({...state, settingsSchema: payload}),
  [changeParsedSchemaStatus]: (state, { payload }) => ({...state, schemeParsedSuccessfully: payload}),
  [updateParsedSchema]: (state, { payload }) => ({...state, parsedSchema: payload}),
}, {
  settingsSchema: '',
  parsedSchema: [],
  schemeParsedSuccessfully: false,
});
const REDUCER_SETTINGS_SCHEMA_NAME = 'settingsSchema';
const settingsSchemaSelector = getReducerProp(REDUCER_SETTINGS_SCHEMA_NAME);

export const SETTINGS_SCHEMA_STATE_NAME = 'settingsSchema';
export const PARSED_SCHEMA_STATE_NAME = 'parsedSchema';
export const SCHEMA_STATUS_STATE_NAME = 'schemeParsedSuccessfully';
export const settingsSchemaStateSelector = createSelector(settingsSchemaSelector, getReducerProp(SETTINGS_SCHEMA_STATE_NAME));
export const parsedSchemaSelector = createSelector(settingsSchemaSelector, getReducerProp(PARSED_SCHEMA_STATE_NAME));
export const schemaStatusSelector = createSelector(settingsSchemaSelector, getReducerProp(SCHEMA_STATUS_STATE_NAME));


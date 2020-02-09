import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import {getReducerProp} from '../../utils/helpers'
import get from "lodash/get";

export const UPDATE_COMPONENTS_ARRAY = 'UPDATE_COMPONENTS_ARRAY';
export const UPDATE_SINGLE_COMPONENT = 'UPDATE_SINGLE_COMPONENT';
export const updateComponentsArray = createAction(UPDATE_COMPONENTS_ARRAY);
export const updateSingleComponent = createAction(UPDATE_SINGLE_COMPONENT);
export const componentsArray = handleActions({
  [updateComponentsArray]: (state, { payload }) => ({...state, componentsArray: payload}),
  [updateSingleComponent]: (state, { payload }) => ({...state, componentsArray: state.componentsArray.map(component => ({
      ...component,
      ...(component.name === payload.name ? payload : {})
    }))}),
}, {
  componentsArray: []
});

export const REDUCER_COMPONENTS_ARRAY_NAME = 'componentsArray';
export const COMPONENTS_ARRAY_PROP_NAME = 'componentsArray';
const componentsArrayStateSelector = getReducerProp(REDUCER_COMPONENTS_ARRAY_NAME);
export const componentsArraySelector = createSelector(componentsArrayStateSelector, getReducerProp(COMPONENTS_ARRAY_PROP_NAME));

export const layersStructureSelector = createSelector(
  componentsArrayStateSelector,
  (state) => {
    const blocksArray = get(state, COMPONENTS_ARRAY_PROP_NAME);

    return blocksArray.reduce((acc,block)=>({
      ...acc,
      [block.enabledIf.length]: [
        ...(acc[block.enabledIf.length] || []),
        block
      ]
    }),{});
});

export const treeStructureSelector = createSelector(
  componentsArrayStateSelector,
  (state) => {
    const blocksArray = get(state, COMPONENTS_ARRAY_PROP_NAME);

    // find only dependent blocks
    const blocksWithConditions = blocksArray.filter(({enabledIf})=>enabledIf.length >0);


    // conditions with longest unique branches that includes all others
    const conditionsMap = {};

    const indexOfCondition = (enabledIf, conditionsMap) => {
      const conditionsMapWiderConditionIndex = Object.values(conditionsMap).findIndex(conditionsArr =>
        enabledIf.every(
          ({element,value}) =>
            conditionsArr.find(condition=>condition.element === element && ''+condition.value === ''+value)
        )
      );
      if(conditionsMapWiderConditionIndex >=0) return conditionsMapWiderConditionIndex;
      const enabledIfWiderConditionAsMapIndex = Object.values(conditionsMap).findIndex(conditionsArr =>
        conditionsArr.every(
          ({element,value}) =>
            enabledIf.find(condition=>condition.element === element && ''+condition.value === ''+value)
        )
      );
      if(enabledIfWiderConditionAsMapIndex >=0) {
        conditionsMap[enabledIfWiderConditionAsMapIndex] = enabledIf;
        return enabledIfWiderConditionAsMapIndex
      }
      const newIndex = Object.keys(conditionsMap).length;
      conditionsMap[newIndex] = enabledIf;
      return newIndex
    };

    // add tree branches index to blocks
    const blocksWithConditionsBranches = blocksWithConditions.map((block)=>({
      ...block,
      branchIndex: indexOfCondition(block.enabledIf, conditionsMap)
    }));

    // find most frequent mentioned blocks for correct conditionsMap tree sorting
    const blockDensityMap = {};
    Object.values(conditionsMap).forEach(conditionsBranchArr => {
      conditionsBranchArr.forEach(({element})=>{
        blockDensityMap[element] = (blockDensityMap[element] || 0) + 1
      })
    });

    // tree sorting by density
    Object.keys(conditionsMap).forEach(key => {
      conditionsMap[key] = conditionsMap[key].sort(({element:el1},{element:el2})=> blockDensityMap[el2] - blockDensityMap[el1])
    });

    blocksWithConditionsBranches.forEach(block => {
      block.enabledIf = block.enabledIf.sort(({element:el1},{element:el2})=> blockDensityMap[el2] - blockDensityMap[el1])
    });


    return { blocksWithConditionsBranches, conditionsMap }
  });
import {componentsArraySelector, updateComponentsArray, updateSingleComponent} from './reducers/componentsArray';
import {actions as notifActions} from 'redux-notifications';
import {
  changeParsedSchemaStatus,
  updateParsedSchema,
  updateSettingsSchema,
} from "./reducers/settingsSchema";
import {calculateIsVisibleBlock} from "../utils/helpers";

const {notifSend} = notifActions;

export const transformSettingsSchema = (settingsSchema) => {
  return (dispatch) => {

    dispatch(updateSettingsSchema(settingsSchema));
    let parsedSchema = null;

    try {
      if (!settingsSchema) return;
      parsedSchema = JSON.parse(settingsSchema);
      dispatch(updateParsedSchema(parsedSchema));
      dispatch(changeParsedSchemaStatus(true));

    } catch (e) {
      dispatch(changeParsedSchemaStatus(false));
      dispatch(notifSend({
        message: 'Invalid JSON',
        kind: 'danger',
        dismissAfter: 2000
      }));
      parsedSchema = null;
    }

    if (parsedSchema) {
      const blocksArray = parsedSchema.map(({name, enabled_if: enabledIf}) => ({
        name,
        values: [],
        currentValue: [],
        dependentBlocks: [],
        enabledIf,
        isVisible: true,
        alwaysVisible: true,
      }));

      // fill values with data from enabledIf value
      blocksArray.forEach(({name: dependentBlockName, enabledIf}, indexOfDependentBlock) => {

        // make level structure according to enabledIf size

        if (enabledIf.length !== 0) {
          blocksArray[indexOfDependentBlock].alwaysVisible = false;
        }

        enabledIf.forEach(({element, value}) => {
          const indexOfControlBlock = blocksArray.findIndex(({name}) => name === element);
          if (indexOfControlBlock >= 0) {
            const {values, currentValue, dependentBlocks} = blocksArray[indexOfControlBlock];
            const normalizedValue = '' + value;
            if (!values.includes(normalizedValue)) {
              values.push(normalizedValue)
            }

            // set default value
            if (currentValue.length === 0) {
              currentValue.push(normalizedValue)
            }

            // add block to control block dependencies
            dependentBlocks.push(dependentBlockName)
          } else {
            dispatch(notifSend({
              message: `enable_if error in component ${dependentBlockName}, no such component ${element}`,
              kind: 'danger',
              dismissAfter: 2000
            }));
            console.log(`enable_if error in component ${dependentBlockName}, no such component ${element}`)

          }
        })
      });

      // set initial visibility
      blocksArray.forEach((dependentBlock, indexOfBlock) => {
        blocksArray[indexOfBlock].isVisible = calculateIsVisibleBlock(dependentBlock, blocksArray,
          (dependentBlockName, controlBlockName) => {
            dispatch(notifSend({
              message: `enable_if error in component ${dependentBlockName}, no such component ${controlBlockName}`,
              kind: 'danger',
              dismissAfter: 2000
            }));
            console.log(`enable_if error in component ${dependentBlockName}, no such component ${controlBlockName}`)
          });
      });






      dispatch(updateComponentsArray(blocksArray));
    }

  };
};


export const updateVisibility = (name, value) => {
  return (dispatch, getState) => {
    const blocksArray = componentsArraySelector(getState());

    const changedBlock = blocksArray.find(({name: blockName}) => blockName === name);
    changedBlock.currentValue = [value];
    dispatch(updateSingleComponent(changedBlock));

    changedBlock.dependentBlocks.forEach(dependentBlockName => {
      const dependentBlock = blocksArray.find(({name}) => name === dependentBlockName);

      const isVisible = calculateIsVisibleBlock(dependentBlock, blocksArray,
        (dependentBlockName, controlBlockName) => {
          dispatch(notifSend({
            message: `enable_if error in component ${dependentBlockName}, no such component ${controlBlockName}`,
            kind: 'danger',
            dismissAfter: 2000
          }));
          console.log(`enable_if error in component ${dependentBlockName}, no such component ${controlBlockName}`)
        });
      if(dependentBlock.isVisible !== isVisible) {
        dependentBlock.isVisible = isVisible;
        dispatch(updateSingleComponent(dependentBlock));
      }
    });

  }
};


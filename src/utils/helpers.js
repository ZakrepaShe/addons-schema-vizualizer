import get from 'lodash/get';

export const getReducerProp = (prop) => (state) => get(state, prop);
export const isDev = () => process.env.NODE_ENV === 'development';

export const calculateIsVisibleBlock = (dependentBlock, blocksArray, errorCb) => !dependentBlock.enabledIf.some(
  ({element: controlBlockName, value: controlBlockEtalonValue}) => {
    const controlBlock = blocksArray.find(({name}) => name === controlBlockName);
    if (controlBlock) {
      return controlBlock.currentValue[0] !== '' + controlBlockEtalonValue
    } else {
      errorCb(dependentBlock.name, controlBlockName);
      return true;
    }
  }
);
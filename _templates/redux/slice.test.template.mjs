import {
    capitalize, getTypeValue, isArrayType
} from 'creator-js-cli';

export default ({redux: {sliceName, fieldName, actionsName, async, successType}}) => {
    const thunkImport = async ? `import { ${actionsName} } from '../${sliceName}/thunks';` : '';
    const successTypeImport = `import { ${successType} } from '../${sliceName}/types';`;

    const imports = [
        `import { ${sliceName}Slice, initialState } from '../${sliceName}/slice';`,
        thunkImport,
        `import { configureStore, EnhancedStore } from '@reduxjs/toolkit';`,
        successTypeImport
    ];

    const syncTest = async ? '' : `it('should update the ${fieldName} in the state', () => {
    const store: EnhancedStore = configureStore({
      reducer: ${sliceName}Slice.reducer,
      preloadedState: initialState
    });

    const mock${capitalize(fieldName)}: ${successType} = ${getTypeValue(successType)};

    store.dispatch(${sliceName}Slice.actions.${actionsName}(mock${capitalize(fieldName)}));

    const expected: string = JSON.stringify(mock${capitalize(fieldName)});
    const result: string = JSON.stringify(store.getState().${fieldName});

    expect(result).toEqual(expected);
  });`;

    const asyncTest = !async ? '' : `it('should update state when ${actionsName}.fulfilled is dispatched', async () => {
  const store: EnhancedStore = configureStore({
    reducer: ${sliceName}Slice.reducer,
    preloadedState: initialState
  });

  const expected1: string = JSON.stringify(initialState.${fieldName});
  const result1: string = JSON.stringify(store.getState().${fieldName});

  expect(result1).toBe(expected1);

  const mock${capitalize(fieldName)}: ${successType} = ${getTypeValue(successType)};
  await store.dispatch(${actionsName}.fulfilled(mock${capitalize(fieldName)}, ''));

  const expected2: string = JSON.stringify(mock${capitalize(fieldName)});
  const result2: string = JSON.stringify(store.getState().${fieldName});

  expect(result2).toBe(expected2);
});`;

    const tests = [
        `it('should have an initial state', () => {
    const store: EnhancedStore = configureStore({
      reducer: ${sliceName}Slice.reducer,
      preloadedState: initialState
    });

    const expected: string = JSON.stringify(initialState);
    const result: string = JSON.stringify(store.getState());

    expect(result).toBe(expected);
  });`,
        `it('should reset state to initial state when resetState is dispatched', async () => {
    const store: EnhancedStore = configureStore({
      reducer: ${sliceName}Slice.reducer,
      // TODO Modify state in order to test resetState
      preloadedState: { ...initialState, }
    });

    store.dispatch(${sliceName}Slice.actions.resetState());

    const expected: string = JSON.stringify(initialState);
    const result: string = JSON.stringify(store.getState());

    expect(result).toBe(expected);
  });`,
        syncTest,
        asyncTest
    ];

    const importsString = imports.join('\n');
    const testsString = tests.filter((s) => s !== '').join('\n\n');

    const init = `${importsString}
    
describe('fruitsSlice', () => {
${testsString}
});
`;

    return {
        init,
        updates: [
            {
                fromLine: ['includes', '/types'],
                direction: 'up',
                searchFor: ['includes', '}'],
                changeWith: `, ${successType} }`,
                when: ['not includes', successType.replace('[]', '')],
                fallback: {
                    searchFor: ['includes', 'toolkit\';'],
                    changeWith: `toolkit';\n${successTypeImport}`,
                }
            },
            {
                fromLine: ['includes', '/thunks'],
                direction: 'up',
                searchFor: ['includes', '}'],
                changeWith: `, ${actionsName} }`,
                when: ['not includes', actionsName],
                fallback: {
                    searchFor: ['includes', 'slice\';'],
                    changeWith: `toolkit';\n${thunkImport}`,
                }
            },
            {
                fromLine: ['includes', '});'],
                direction: 'up',
                searchFor: ['includes', '});'],
                changeWith: `\n${asyncTest}\n});`,
                when: ['not includes', `should update state when ${actionsName}.fulfilled is dispatched`],
            },
            {
                fromLine: ['includes', '});'],
                direction: 'up',
                searchFor: ['includes', '});'],
                changeWith: `\n${syncTest}\n});`,
                when: ['not includes', `it('should update the ${fieldName} in the state`],
            }
        ]
    };
};

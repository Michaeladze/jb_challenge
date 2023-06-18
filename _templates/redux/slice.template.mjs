import {
  capitalize, getTypeValue
} from 'creator-js-cli';

export default ({ redux: { sliceName, fieldName, actionsName, async, successType } }) => {

  const ISlice = `I${capitalize(sliceName)}Slice`;
  const thunkImport = async ? `import { ${actionsName} } from './thunks';` : '';

  const successTypeImport = `import { ${successType} } from './types';`;

  const asyncActionUpdate = async ? `, ${actionsName} }` : '}';
  const syncActionUpdate = async ? '}' : `${actionsName}, }`;

  const defaultSyncBuilder = '\nresetState: () => initialState,'

  const syncBuilderString = !async ? `\n${actionsName}: (state: ${ISlice}, { payload }: { payload: ${successType}}) => {
      state.${fieldName} = payload;
    },` : '';

  const asyncBuilderString = async ? `\nbuilder.addCase(${actionsName}.fulfilled, (state: ${ISlice}, { payload }) => {
  state.${fieldName} = payload;
});` : '';

  const exportActionsString = `export const { resetState,${!async ? actionsName : ''} } = ${sliceName}Slice.actions;`;
  const exportDefaultReducerString = `export default ${sliceName}Slice.reducer;`;

  return {
    init: `import { createSlice } from '@reduxjs/toolkit';
${successTypeImport}
${thunkImport}

export interface ${ISlice} {
  ${fieldName}: ${successType};
}

export const initialState: ${ISlice} = {
  ${fieldName}: ${getTypeValue(successType)},
};

export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {${defaultSyncBuilder}${syncBuilderString}
  },
  extraReducers: (builder) => {${asyncBuilderString}
  },
});

${exportActionsString}
${exportDefaultReducerString}
`,
    updates: [
      {
        fromLine: ['includes', './types'],
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
        fromLine: ['includes', './thunks'],
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: asyncActionUpdate,
        when: ['not includes', actionsName],
        fallback: {
          searchFor: ['includes', 'toolkit\';'],
          changeWith: `toolkit';\n${thunkImport}`,
        }
      },
      {
        fromLine: ['includes', `export interface ${ISlice}`],
        searchFor: ['includes', '}'],
        changeWith: `  ${fieldName}: ${successType};\n}`
      },
      {
        fromLine: ['includes', 'const initialState'],
        searchFor: ['includes', '};'],
        changeWith: `${fieldName}: ${getTypeValue(successType)},\n}`
      },
      {
        fromLine: ['includes', 'extraReducers'],
        searchFor: ['includes', '{'],
        changeWith: `{${asyncBuilderString}`
      },
      {
        fromLine: ['includes', 'reducers'],
        searchFor: ['includes', '{'],
        changeWith: `{${syncBuilderString}`
      },
      {
        direction: 'up',
        fromLine: ['includes', `= ${sliceName}Slice.actions;`],
        searchFor: ['includes', '}'],
        changeWith: syncActionUpdate,
      }
    ]
  };
};

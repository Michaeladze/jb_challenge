export default ({ redux: { actionsName, serviceNamespace, successType, pendingType, reducerName } }) => {

  const serviceString = `export const ${actionsName} = createAsyncThunk<${successType}${pendingType && pendingType !== 'void' ? `, ${pendingType}` : ''}>(
  '${reducerName}/${actionsName}',
  async (${pendingType && pendingType !== 'void' ? `payload: ${pendingType}` : '_'}, { rejectWithValue }) => {
    try {
      return await ${serviceNamespace}.${actionsName}(${pendingType && pendingType !== 'void' ? 'payload' : ''});
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);`;

  const importTypes = `import { ${pendingType}, ${successType} } from './types';`;

  return {
    init: `import { createAsyncThunk } from '@reduxjs/toolkit';
import { ${serviceNamespace} } from './services';
${importTypes}

${serviceString}
`,
    updates: [
      {
        direction: 'up',
        searchFor: ['includes', ');'],
        changeWith: `);\n\n${serviceString}`
      },
      {
        fromLine: ['includes', './types'],
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `, ${successType} }`,
        when: ['not includes', successType.replace('[]', '')],
        fallback: {
          searchFor: ['includes', 'toolkit\';'],
          changeWith: `toolkit';\n${importTypes}`
        }
      },
      {
        fromLine: ['includes', './types'],
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `, ${pendingType} }`,
        when: ['not includes', pendingType],
        fallback: {
          searchFor: ['includes', 'toolkit\';'],
          changeWith: `toolkit';\n${importTypes}`
        }
      }
    ]
  };
};

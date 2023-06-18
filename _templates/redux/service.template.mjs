export default ({ redux: { serviceNamespace, actionsName, pendingType, successType } }) => {

  const serviceString = `async ${actionsName}(${pendingType && pendingType !== 'void' ? `payload: ${pendingType}` : ''}): Promise<${successType}> {
    const url = '/${actionsName}';
    const response: AxiosResponse<${successType}> = await Axios.get(url);
    return response.data;
  },`;

  const importTypes = `import { ${pendingType}, ${successType} } from './types';`;

  return {
    init: `import Axios, { AxiosResponse } from 'axios';
${importTypes}

export const ${serviceNamespace} = {
  ${serviceString}
}
`,
    updates: [
      {
        fromLine: ['includes', './types'],
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `, ${pendingType} }`,
        when: ['not includes', pendingType],
        fallback: {
          searchFor: ['includes', `OdataApiService';`],
          changeWith: `OdataApiService';\nimport { ${pendingType} } from './types';`
        }
      },
      {
        fromLine: ['includes', './types'],
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `, ${successType} }`,
        when: ['not includes', successType.replace('[]', '')],
        fallback: {
          searchFor: ['includes', `OdataApiService';`],
          changeWith: `OdataApiService';\nimport { ${successType} } from './types';`
        }
      },
      {
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `${serviceString}\n\n}`
      }
    ]
  };
};

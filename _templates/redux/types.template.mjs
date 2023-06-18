export default ({ redux: { pendingType, successType } }) => {
  const pendingTypeString = `export interface ${pendingType} {
  any?: any;
}`;
  const successTypeString = `export interface ${successType} {
  any?: any;
}`;

  return {
    init: `${pendingTypeString}

${successTypeString}
`,
    updates: [
      {
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `}\n\n${pendingTypeString}`,
        when: ['not includes', pendingType]
      },
      {
        direction: 'up',
        searchFor: ['includes', '}'],
        changeWith: `}\n\n${successTypeString}`,
        when: ['not includes', successType.replace('[]', '')],
      }
    ]
  };
};

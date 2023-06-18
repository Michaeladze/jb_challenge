/** @type {import('../index').CreatorAnswersFunction} */
const template = ({ components: { componentName } }) => {

    const exportString = `export * from './${componentName}';`;

    return {
        init: `/* istanbul ignore file */
${exportString} 
`,
        updates: [
            {
                searchFor: ['includes', ';'],
                changeWith: `;\n${exportString}`
            }
        ]
    };
};

export default template;

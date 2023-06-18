/** @type {import('../index').CreatorAnswersFunction} */
const template = ({ components }) => {

  const isPage = components.filePath.includes('pages');

  const exportString = isPage ? `export default ${components.componentName};` : `export { ${components.componentName} };`;

  return {
    init: `/* istanbul ignore file */
import { ${components.componentName} } from './${components.componentName}';

${exportString} 
`
  };
};

export default template;

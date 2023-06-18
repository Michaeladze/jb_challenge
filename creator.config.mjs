export default {
  variables: {
    root: './src',
    createEmpty: true,
  },
  domains: [
    {
      name: 'components',
      structure: {
        components: '',
        features: {
          $feature: ''
        },
        pages: {
          $page: {
            index: '',
            components: '',
            features: {
              $feature: ''
            }
          }
        }
      },
      templates: [
        {
          name: ({ components: { componentName, filePath } }) => {
            return filePath.includes('index') ? `../${componentName}.tsx` : `${componentName}/${componentName}.tsx`;
          },
          template: '../_templates/components/component.template.mjs',
        },
        {
          name: ({ components: { componentName, filePath } }) => {
            return filePath.includes('index') ? `../${componentName}.css` : `${componentName}/${componentName}.css`
          },
          template: '../_templates/components/styles.template.mjs'
        },
        {
          name: ({ components: { componentName, filePath } }) => {
            return filePath.includes('index') ? `../${componentName}.test.tsx` : `${componentName}/${componentName}.test.tsx`
          },
          template: '../_templates/components/tests.template.mjs'
        },
        {
          name: ({ components: { componentName, filePath } }) => {
            return filePath.includes('index') ? `../index.ts` : `${componentName}/index.ts`;
          },
          template: '../_templates/components/index.template.mjs'
        },
        {
          name: 'index.ts',
          template: '../_templates/components/feature-index.template.mjs',
          when: ({ components: { filePath } }) => filePath.includes('features')
        },
        {
          name: '../../../router/index.tsx',
          template: '../_templates/router/index.template.mjs',
          when: ({ components: { filePath } }) => filePath.includes('pages') && filePath.includes('index')
        }
      ],
      questions: [
        {
          name: 'componentName',
          message: 'How to name the component?',
          type: 'input',
          default: (answers) => answers['_new-folder_3'],
          validate: (input) => input !== '',
        },
        {
          name: 'componentDetails',
          message: 'What to add to the component?',
          type: 'checkbox',
          choices: [
            {
              name: 'props'
            },
            {
              name: 'children'
            },
            {
              name: 'useDispatch'
            },
            {
              name: 'useLocation'
            },
            {
              name: 'useParams'
            },
            {
              name: 'useNavigate'
            },
            {
              name: 'useState'
            },
            {
              name: 'useEffect'
            },
            {
              name: 'useForm'
            },
            {
              name: 'Outlet'
            }
          ]
        },
        {
          name: 'routePath',
          message: 'What route?',
          type: 'input',
          validate: (input) => input !== '',
          when: (answers) => {
            const values = Object.values(answers);
            return values.includes('pages') && values.includes('index');
          }
        },
        {
          name: 'withReducer',
          message: 'Associate this page with reducer?',
          type: 'confirm',
          default: true,
          when: (answers) => {
            const values = Object.values(answers);
            return values.includes('pages') && values.includes('index');
          }
        }
      ],
      next: {
        name: 'redux',
        skipStructure: true,
        when: ({ components: { withReducer } }) => withReducer
      }
    },
    {
      name: 'redux',
      structure: {
        pages: {
          $page: ''
        }
      },
      templates: [
        {
          name: (answers) => answers.variables.root + '/redux/index.ts',
          template: '../_templates/redux/index.template.mjs'
        },
        {
          name: (answers) => answers.variables.root + '/redux/test-utils.tsx',
          template: '../_templates/redux/test-utils.template.mjs'
        },
        {
          name: (answers) => answers.variables.root + '/redux/useInjectReducer.ts',
          template: '../_templates/redux/useInjectReducer.template.mjs'
        },
        {
          name: (answers) => answers.variables.root + '/redux/withReducer.tsx',
          template: '../_templates/redux/withReducer.template.mjs'
        },
        {
          name: (answers) => answers.variables.root + '/main.tsx',
          template: '../_templates/redux/app.template.mjs'
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/${sliceName}/slice.ts`;
          },
          template: '../_templates/redux/slice.template.mjs'
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/${sliceName}/selectors.ts`;
          },
          template: '../_templates/redux/selector.template.mjs'
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/${sliceName}/thunks.ts`;
          },
          template: '../_templates/redux/thunk.template.mjs',
          when: ({ redux: { async } }) => async
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/${sliceName}/services.ts`;
          },
          template: '../_templates/redux/service.template.mjs',
          when: ({ redux: { async } }) => async
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/${sliceName}/types.ts`;
          },
          template: '../_templates/redux/types.template.mjs'
        },
        {
          name: ({ components }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/reducer.ts`;
          },
          template: '../_templates/redux/reducer.template.mjs'
        },
        {
          name: ({ components, redux: { sliceName } }) => {
            const isPageIndex = components?.filePath.includes('pages') && components?.filePath.includes('index');
            const prefix = components ? isPageIndex ? '/..' : `/${components.componentName}` : '';
            return `.${prefix}/redux/__tests__/${sliceName}.test.ts`;
          },
          template: '../_templates/redux/slice.test.template.mjs'
        }
      ],
      questions: [
        {
          name: 'reducerName',
          message: 'How to name reducer?',
          type: 'input',
          default: (answers) => answers.componentName?.toLowerCase() || answers['_file_2'].toLowerCase() || ''
        },
        {
          name: 'sliceName',
          message: 'How to name slice?',
          type: 'input'
        },
        {
          name: 'fieldName',
          message: 'How to name field?',
          type: 'input'
        },
        {
          name: 'async',
          message: 'Is action async?',
          type: 'confirm'
        },
        {
          name: 'actionsName',
          message: 'How to name actions?',
          type: 'input'
        },
        {
          name: 'serviceNamespace',
          message: 'What service namespace?',
          type: 'input',
          when: (answers) => answers.async,
          default: (answers) => {
            const sliceNameCapitalized = answers.sliceName.charAt(0).toUpperCase() + answers.sliceName.slice(1);
            return sliceNameCapitalized + 'API';
          }
        },
        {
          name: 'pendingType',
          message: 'Payload type?',
          type: 'input',
          default: 'void',
          when: (answers) => answers.async
        },
        {
          name: 'successType',
          message: 'Response type',
          type: 'input',
          default: 'void'
        }
      ],
      next: {
        name: 'components_reducer',
        when: ({ components }) => !!components?.withReducer
      }
    },
    {
      name: 'components_reducer',
      hidden: true,
      questions: [
        {
          name: 'dispatchNewAction',
          message: 'Dispatch new action from the page?',
          type: 'confirm',
          default: true
        },
        {
          name: 'useSelector',
          message: 'Use selector in the page?',
          type: 'confirm',
          default: true
        }
      ]
    }
  ]
};

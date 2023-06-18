import {capitalize, getTypeValue} from "creator-js-cli";

/** @type {import('../index').CreatorAnswersFunction} */
const template = (answers) => {

    const { components, redux, components_reducer } = answers;

    const itemsFromReact = [];
    const itemsFromRouterDom = [];
    let reactImport = '';
    let routerDomImport = '';
    let dispatchImport = '';
    let useSelector = '';
    let useHistory = '';
    let useLocation = '';
    let useParams = '';
    let useState = '';
    let useEffect = '';
    let outlet = '';
    let formImport = '';
    let formTemplate = '';
    let hasProps = false;
    let childrenImport = false;

    const separator = '// -------------------------------------------------------------------------------------------------------------------';

    components.componentDetails.forEach((o) => {
        if (o === 'props') {
            hasProps = true;
        }

        if (o === 'useDispatch') {
            dispatchImport = 'import { useDispatch } from \'react-redux\';';
        }

        if (o === 'useLocation') {
            useLocation = 'const location = useLocation();';
            itemsFromRouterDom.push('useLocation');
        }

        if (o === 'useNavigate') {
            useHistory = 'const navigate = useNavigate();';
            itemsFromRouterDom.push('useNavigate');
        }

        if (o === 'useParams') {
            useParams = 'const params = useParams();';
            itemsFromRouterDom.push('useParams');
        }

        if (o === 'Outlet') {
            outlet = '<Outlet/>';
            itemsFromRouterDom.push('Outlet');
        }

        if (o === 'useState') {
            useState = 'const [state, useState] = useState();';
            itemsFromReact.push('useState');
        }

        if (o === 'useEffect') {
            useEffect = '\nuseEffect(() => {}, []);';
            itemsFromReact.push('useEffect');
        }

        if (o === 'children') {
            itemsFromReact.push('ReactNode')
            hasProps = true;
            childrenImport = true;
        }

        if (o === 'useForm') {
            formImport = 'import { FormProvider, useForm } from \'react-hook-form\';';
            formTemplate = `const form = useForm({
    defaultValues: {},
    // resolver: yupResolver(schema)
  });
  
  const { handleSubmit } = form;
  
  const onSubmit = () => {
    handleSubmit((data: any) => {
      console.log(data);
    }, (errors) => {
      console.log(errors);
    })();
  };
    
  ${separator}
  `;
        }
    });


    if (itemsFromRouterDom.length > 0) {
        routerDomImport = `import { ${itemsFromRouterDom.join(',')} } from 'react-router-dom';`;
    }

    const styleImport = `import './${components.componentName}.css';`;

    let useDispatch = dispatchImport ? 'const dispatch = useDispatch();' : '';

    const propsString = hasProps || childrenImport ? `{ ${childrenImport ? 'children' : ''} }: IProps` : '';

    const withReducerImport = components.withReducer ? `\nimport { withReducer } from '../../redux/withReducer';\nimport { reducer } from './redux/reducer';` : '';


    const formLayout = formImport ? `<FormProvider { ...form }>
    <></>
</FormProvider>` : '';

    let selectorImport = redux?.fieldName ? `import { use${capitalize(redux.fieldName)}Selector } from './redux/${redux.sliceName}/selectors';` : '';
    let thunkImport = redux?.actionsName ? `import { ${redux.actionsName} } from './redux/${redux.sliceName}/thunks';` : '';

    if (components_reducer?.useSelector && redux?.fieldName) {
        useSelector = `\nconst ${redux.fieldName} = use${capitalize(redux.fieldName)}Selector`;
    }

    if (redux?.async && components_reducer?.dispatchNewAction && redux?.actionsName) {
        dispatchImport = 'import { useDispatch } from \'react-redux\';';
        useDispatch = 'const dispatch = useDispatch();';
        useSelector = `\nconst ${redux.fieldName} = use${capitalize(redux.fieldName)}Selector();`

        if (!itemsFromReact.includes('useEffect')) {
            itemsFromReact.push('useEffect');
        }

        useEffect = `\nuseEffect(() => {${redux.pendingType && redux.pendingType !== 'void' ? `\nconst payload: ${redux.pendingType} = ${getTypeValue(redux.pendingType)}` : ''}
        dispatch(${redux.actionsName}(${redux.pendingType && redux.pendingType !== 'void' ? 'payload' : ''}));
        }, [dispatch]);`
    }

    if (itemsFromReact.length > 0) {
        reactImport = `import React, { ${itemsFromReact.join(',')} } from 'react';`;
    } else {
        reactImport = `import React from 'react';`;
    }

    const hooks = [
        useDispatch,
        useLocation,
        useHistory,
        useParams,
        useSelector,
        useState,
        useEffect
    ].filter((item) => item !== '').join('\n');

    const imports = [
        reactImport,
        styleImport,
        dispatchImport,
        routerDomImport,
        formImport,
        withReducerImport,
        selectorImport,
        thunkImport
    ].filter((item) => item !== '').join('\n');

    const layouts = [formLayout, outlet].filter((item) => item !== '').join('\n');

    const withReducerString = components?.withReducer ? `\n\nexport const ${components.componentName} = withReducer('${redux.reducerName}', reducer)(${components.componentName}View);` : '';

    return {
        init: `${imports}

${hasProps ? 'interface IProps {' : ''}
${childrenImport ? 'children: ReactNode | ReactNode[];' : ''}
${hasProps ? '}' : ''}

${components.withReducer ? '' : 'export'} const ${components.componentName}${components.withReducer ? 'View' : ''}: React.FC${hasProps ? '<IProps>' : ''} = (${propsString}) => {
  ${hooks}

  ${separator}
     
  ${formTemplate}

  return (
    <div>
      ${layouts}
    </div>
  );
};${withReducerString}`
    };
};

export default template;

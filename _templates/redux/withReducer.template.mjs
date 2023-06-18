export default () => {
    return {
        init: `import React from 'react';
import { Reducer } from 'redux';
import { useInjectReducer } from './useInjectReducer';

export const withReducer = (namespace: string, reducer: Reducer) => {
  return (WrappedComponent: React.FC) =>
    (props): React.ReactElement => {
      const injected: boolean = useInjectReducer(namespace, reducer);
      return injected ? <WrappedComponent {...props} /> : null;
    };
};
`,
        updates: []
    };
};

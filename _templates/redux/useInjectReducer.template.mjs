export default () => {
    return {
        init: `import { useEffect, useState } from 'react';


import { useStore } from 'react-redux';


import { Reducer } from 'redux';
import { injectReducer } from './index.ts';

export const useInjectReducer = (namespace: string, reducer: Reducer): boolean => {
  const store = useStore();

  const [isInjected, setIsInjected] = useState<boolean>(false);

  useEffect(() => {
    if (!isInjected) {
      injectReducer(namespace, reducer);
      setIsInjected(true);
    }
  }, [
    isInjected,
    setIsInjected,
    namespace,
    reducer,
    store,
  ]);

  return isInjected;
};
`,
        updates: []
    };
};

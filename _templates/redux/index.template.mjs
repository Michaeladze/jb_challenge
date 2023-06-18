export default () => {
    return {
        init: `import { configureStore, createReducer } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';
const staticReducers = createReducer({}, () => {});

export const store = configureStore({
  reducer: staticReducers,
  devTools: true
});

const asyncReducers: Record<string, Reducer> = {};

export const injectReducer = (key: string, asyncReducer: Reducer): void => {
  asyncReducers[key] = asyncReducer;
  store.replaceReducer(createCustomReducer(asyncReducers));
};

function createCustomReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}
`,
        updates: []
    };
};

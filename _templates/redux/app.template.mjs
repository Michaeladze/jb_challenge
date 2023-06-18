export default () => {
    return {
        init: '',
        updates: [
            {
                direction: 'down',
                when: ['not includes', 'import { store }'],
                searchFor: ['includes', '\'react-router-dom\';'],
                changeWith: `\'react-router-dom\';\nimport { store } from './redux';\nimport { Provider } from 'react-redux';`,
            },
            {
                fromLine: ['includes', 'ReactDOM.createRoot'],
                direction: 'down',
                when: ['not includes', '<Provider'],
                searchFor: ['includes', '<App />'],
                changeWith: `<Provider store={store}>\n<App />\n</Provider>`,
            }
        ]
    };
};

import './main.css';

import uuid from 'node-uuid';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import rootReducer from './reducers';
import App from './components/App';
import Layout from './components/Layout';

const store = createStore(rootReducer, {
	notes: [
		{ id: uuid.v4(), editing: false, task: 'Learn Webpack' },
		{ id: uuid.v4(), editing: false, task: 'Learn React' },
		{ id: uuid.v4(), editing: false, task: 'Drink a beer' }
	]
}, compose(
	window.devToolsExtension ? window.devToolsExtension() : undefined
));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Layout}>
				<IndexRoute component={App} />
			</Route>
			<Redirect from="*" to="/" />
		</Router>
	</Provider>,
	document.querySelector('.app')
);

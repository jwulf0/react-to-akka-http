import * as React from "react";
import {render} from "react-dom";
import App from "./components/App";
import { createStore, Reducer, Action, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { reducer as countingReducer } from "./modules/counting/reducer"
import { State as CountingState } from "./modules/counting/reducer"
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';

export interface AppState {
    counting: CountingState
}

const rootReducer = combineReducers({
    counting: countingReducer
});

const store = COMPILE_TIME_VALUE_IS_PROD ? createStore(rootReducer, applyMiddleware(thunk)): createStore(rootReducer,
    undefined,
    compose(
        applyMiddleware(thunk),
        typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

const rootEl = document.getElementById("root");

render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    rootEl,
);

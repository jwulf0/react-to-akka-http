import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State as CounterState } from "../../modules/counting/reducer";
import { increase, decrease } from "../../modules/counting/actions";

// This is the partial structure of the Application State in the redux store this component expects in order to extract its information with useSelector().
interface AppState {
    counting: CounterState;
}

export const PageCounter: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const {clickCount, inFlight, error} = useSelector<AppState, CounterState>(state => state.counting);

    return <div className="page-counter">
        <h2>Counter</h2>
        <p>This component subscribes to counter information from the <a target="_new" href="https://react-redux.js.org/">redux</a> store, using <a target="_new" href="https://react-redux.js.org/api/hooks">useSelector</a>, to display the current counter value.</p>
        <p>It publishes actions to redux using the dispatcher obtained with <span>useDispatch</span>.</p>
        <p>The actions are actually <a target="_new" href="https://github.com/reduxjs/redux-thunk">thunks</a> which describe the "saga" of a counting-action: Update the state's "request in flight" status, make a request to the server, reduce the state and the response to a new state. See the client's <span className="code">counting</span>-module to see what happens request-wise.</p>
        <p>See the server application's module <span className="code">jwulf.counting</span> to see what happens on the server (e.g. JSON-Deserialization with <a target="_new" href="https://github.com/spray/spray-json">spray-json</a>, a <a target="_new" href="https://doc.akka.io/docs/akka/current/typed/actors.html">typed actor</a> to handle the request and respond). The counting actor delays its response by half a second whenever the new counter value is dividable by 5, just do have some degree of varying behavior.</p>

        { clickCount === undefined ? <p>Loading Counter...</p> : 
            <div className="counter">
                <button className="increase" disabled={inFlight} onClick={() => dispatch(increase(1))}>+1</button>
                <button className="decrease" disabled={inFlight} onClick={() => dispatch(decrease(1))}>-1</button>
                <label>{clickCount !== undefined ? clickCount : "..."}</label>
            </div>
            }
        { error ? <p className="error">{error}</p> : null }
    </div>
}
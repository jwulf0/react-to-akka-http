import { Action, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk";

// -- Action Types --

type ActionType = 'ACTION_REGISTER_STARTING_REQUEST' | 'ACTION_SET_VALUE' | 'ACTION_SET_ERROR';


// -- Actions --

export type CountAction = Action<ActionType>

export interface StartingRequest extends Action<ActionType> {
    readonly type: 'ACTION_REGISTER_STARTING_REQUEST';
}

export interface SetValue extends CountAction {
    readonly type: 'ACTION_SET_VALUE';
    readonly value: number;
}

export interface SetError extends CountAction {
    readonly type: 'ACTION_SET_ERROR';
    readonly error: string;
}


// -- Action Builders --

// --- Immediate actions --- (as in: not thunks)

export const startingRequest = (): StartingRequest => ({ type: 'ACTION_REGISTER_STARTING_REQUEST' })

const setValue = (value: number): SetValue => ({type: 'ACTION_SET_VALUE', value})

const setError = (error: string): SetError => ({type: 'ACTION_SET_ERROR', error})


// --- Thunks ---

type AppState = {}    // if getState() is required in one of the Thunk Actions, describe the expected App State in this type
type ExtraParams = {} // if ExtraParams are used, describe their expected type in this type
type CountingThunkAction<R> = ThunkAction<R, AppState, ExtraParams, CountAction>
type DefaultCountingThunk = CountingThunkAction<void> // a default alias since we don't use return values anywhere for now

export const initialize = (): DefaultCountingThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startingRequest());

        fetch('/api/counter', {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setValue((res as { value: number }).value))
        })
    }
}

export const increase = (incBy: number): DefaultCountingThunk => {
    return (dispatch: Dispatch) => sendRequest(dispatch, incBy);
}

export const decrease = (decBy: number): DefaultCountingThunk => {
    return (dispatch: Dispatch) => sendRequest(dispatch, -1 * decBy);
}

const sendRequest = (dispatch: Dispatch, delta: number) => {
    dispatch(startingRequest());
    fetch('/api/counter', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({delta})
    })
    .then(res => res.status === 200 ? res.json() : Promise.reject(new Error(`Bad HTTP Status ${res.status}`)))
    .then(res => dispatch(setValue(res.value as number)))
    .catch(err => {
        dispatch(setError(err instanceof Error ? err.message : 'Some error occured...'))
    })
}
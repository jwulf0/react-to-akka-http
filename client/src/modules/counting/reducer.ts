import { Reducer } from "react";
import { CountAction, SetValue, SetError } from "./actions";

export interface State {
    readonly clickCount: number | undefined;
    readonly inFlight: boolean;
    readonly error: string | undefined;
}

const initialState: State = {
    clickCount: undefined,
    inFlight: false,
    error: undefined
};

export const reducer: Reducer<State, CountAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTION_REGISTER_STARTING_REQUEST':
            return {...state, inFlight: true, error: undefined};
        case 'ACTION_SET_VALUE':
            return {...state, clickCount: (action as SetValue).value, inFlight: false};
        case 'ACTION_SET_ERROR':
            return {...state, error: (action as SetError).error, inFlight: false}
        default: return state;
    }
};
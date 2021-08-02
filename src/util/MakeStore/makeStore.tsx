import React, { createContext, useContext, useReducer } from "react";

export type Action = { type: string, payload?: any};
export type Reducer<State, Actions> = (state: State, action: Actions) => State;
export type Dispatch<Actions> = (a: Actions) => void;

const noop = () => {};

export default function makeStore<State extends object, Actions>(reducer: Reducer<State, Actions>, initialState: State) {
	const StoreContext = createContext<State>(initialState);
	const DispatchContext = createContext<Dispatch<Actions>>(noop);

	const StoreProvider = ({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element => {
		const [store, dispatch] = useReducer(reducer, initialState);

		return (
			<DispatchContext.Provider value={dispatch}>
				<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
			</DispatchContext.Provider>
		)
	}

	const useStore = () => {
		return useContext<State>(StoreContext)
	}

	const useDispatch = () => {
		return useContext(DispatchContext)
	}

	return [StoreProvider, useStore, useDispatch] as const;
}
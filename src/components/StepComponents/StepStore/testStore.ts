import makeStore from "../../../util/MakeStore/makeStore";
import testStoreReducer from "./reducer";
import { TestStoreActions } from "./actions";

export interface State {
	count: number;
	textInput: string;
	numberInput: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	SSN: string;
}

const initialState: State = {
	count: 0,
	textInput: 'initial text',
	numberInput: 9001,
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	SSN: '',
}

const [
	StoreProvider,
	useStore,
	useDispatch,
] = makeStore<State, TestStoreActions>(testStoreReducer, initialState);

export { useStore, useDispatch }
export default StoreProvider
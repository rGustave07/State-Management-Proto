import { TestStoreActions } from "./actions"
import { Reducer } from "../../../util/MakeStore/makeStore";
import { State } from "./testStore";

const testStoreReducer:
	Reducer<State, TestStoreActions> = (
		state: State, action: TestStoreActions
	): State => {
		switch (action.type) {
			case 'increment':
				return {
					...state,
					count: state.count + 1
				}
			case 'decrement':
				return {
					...state,
					count: state.count - 1
				}
			case 'editInput':
				return {
					...state,
					textInput: action.payload.newInput
				}
			case 'batchUpdate':
				return {
					...state,
					...action.payload.newState
				}
			case 'editFirstName':
				return {
					...state,
					firstName: action.payload.firstNameInput,
				}
			case 'editLastName':
				return {
					...state,
					lastName: action.payload.lastNameInput,
				}
			case 'editEmail':
				return {
					...state,
					email: action.payload.emailInput,
				}
			case 'editSSN':
				return {
					...state,
					SSN: action.payload.ssnInput,
				}
			default:
				return state;
		}
}

export default testStoreReducer;
import { State } from './testStore';

export type TestStoreActions =
	{ type: 'increment' } |
	{ type: 'decrement'} |
	{ type: 'editInput', payload: { newInput: string }} |
	{ type: 'editNumberInput', payload: { newNumberInput: number }} |
	{ type: 'batchUpdate', payload: { newState: Partial<State> | State }} |
	{ type: 'editFirstName', payload: { firstNameInput: string }} |
	{ type: 'editLastName', payload: { lastNameInput: string }} |
	{ type: 'editSSN', payload: { ssnInput: string }} |
	{ type: 'editEmail', payload: { emailInput: string }};

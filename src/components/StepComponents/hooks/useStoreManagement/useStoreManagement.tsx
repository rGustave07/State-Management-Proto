import * as React from 'react';

import { useStore, useDispatch, State } from '../../StepStore/testStore';
import useGenericFormVaidation, {
	generateInputValidationTracker,
	InputType,
	ValidationObj,
} from '../useGenericFormValidation/useGenericFormValidation';

interface Controls {
	store: State,
	formEditFunctionsComponentThree: {
		changeTextInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
		changeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
		changeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
		submitMockForm: () => void;
	},
	formEditFunctionsComponentTwo: {
		changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
		decrementCount: () => void;
	}
}

const customInputValidation = (input: ValidationObj) => {
	if (String(input.input).length < 3) {
		return true
	}

	return false;
}

const addedExtraValidation = (input: ValidationObj): boolean => {
	if (input.input === 'test') return true;
	return false;
}

const useStoreManagement = (): Controls => {
	const store = useStore();
	const dispatch = useDispatch();

	const {
		invalidFields,
		hasError,
	} = useGenericFormVaidation({
		nameField: {
			overwriteValidation: customInputValidation,
			extraValidations: [addedExtraValidation],
			applySpecificallyTo: ['firstName']
		},
		trackedInputs: [
			generateInputValidationTracker(store.firstName, InputType.Name, 'firstName', true),
			generateInputValidationTracker(store.lastName, InputType.Name, 'lastName',true),
			generateInputValidationTracker(store.email, InputType.Email, 'email', false),
		],
		deps: [store.firstName, store.lastName, store.email]
	});

	React.useEffect(() => {
		_hydrateStateWithApiData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (hasError) {
			invalidFields.forEach(invalidField => errorHandler(invalidField));
		} else {
			console.log('no form error')
		}
	}, [hasError, invalidFields]);

	const errorHandler = (input: ValidationObj) => {
		switch(input.inputName) {
			case 'firstName':
				console.log('firstName error')
				return;
			case 'lastName':
				console.log('lastName error')
				return;
		}
	}

	const apiPostMockSubmit = (data: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				setTimeout(() => {
					console.log('data submitted')
					resolve(data);
				}, 3000);
			} catch(err) {
				reject('Something went wrong')
			} finally {
				return;
			}
		});
	};

	const _hydrateStateWithApiData = () => {
		// can call API for data and dispatch bulk state update for hydration
		const mockApiData = {
			count: 5,
			textInput: 'state hydrated',
			numberInput: 9002
		}

		// Dispatch bulk state update
		dispatch({type: 'batchUpdate', payload: { newState: mockApiData }})
	}

	// STATE MUTATING FUNCTIONS
	const decrementCount = (): void => {
		dispatch({ type: 'decrement' })
	};

	const changeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({type: 'editInput', payload: { newInput: e.target.value }})
	};

	const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({type: 'editFirstName', payload: { firstNameInput: e.target.value}})
	};

	const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({type: 'editLastName', payload: { lastNameInput: e.target.value}})
	};

	const changeEmail =  (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({type: 'editEmail', payload: { emailInput: e.target.value }})
	};

	const submitMockForm = (): void => {
		if (!hasError) {
			apiPostMockSubmit({firstName: store.firstName, lastName: store.lastName});
		} else {
			console.log(`can't continue, error occured`);
		}
	}

	return {
		store,
		formEditFunctionsComponentThree: {
			changeTextInput,
			changeFirstName,
			changeLastName,
			submitMockForm,
		},
		formEditFunctionsComponentTwo: {
			changeEmail,
			decrementCount,
		}
	}
}

export default useStoreManagement;

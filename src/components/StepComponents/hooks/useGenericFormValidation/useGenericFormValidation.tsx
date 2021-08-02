import * as React from "react";

export enum InputType {
	Email = 0,
	Name = 1,
	SSN = 2,
	Date = 4,
}

export interface ValidationObj {
	input: string | number;
	inputName: string;
	inputType: InputType;
	isRequired?: boolean;
}

const CONSTANTS = {
	MAX_NAME_LENGTH: 6,
	// eslint-disable-next-line no-useless-escape
	EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const generateInputValidationTracker = (
	input: string | number,
	inputType: InputType,
	inputName: string,
	isRequired?: boolean,
): ValidationObj => {

	return {
		input,
		inputType,
		inputName,
		isRequired
	}
} 

type ValidationFunction = (input: ValidationObj) => boolean;

interface Controls {
	isEmpty: (input: ValidationObj) => boolean;
	isInvalid: (input: ValidationObj) => void;
	hasError: boolean;
	invalidFields: ValidationObj[];
	runValidations: () => void;
}

interface ValidationOptions {
	extraValidations?: ValidationFunction[],
	overwriteValidation?: (input: ValidationObj) => boolean;
	applySpecificallyTo?: string[];
}

// Validation functions return true if the input is invalid
interface ValidationProps {
	emailField?: ValidationOptions,
	nameField?: ValidationOptions,
	ssnField?: ValidationOptions,
	dateField?: ValidationOptions,
	trackedInputs: ValidationObj[]
	deps: ( string | number )[]
}

const useGenericFormVaidation = (props: ValidationProps): Controls => {
	const {
		emailField,
		nameField,
		ssnField,
		dateField,
		trackedInputs,
		deps
	} = props;

	const [hasError, setHasError] = React.useState(false);
	const renderingRef = React.useRef(0);
	const [invalidFields, setInvalidFields] = React.useState<ValidationObj[]>([]); 

	React.useEffect(() => {
		if (renderingRef.current > 0) {
			runValidations();
		}

		renderingRef.current = 1;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);

	const runValidations = () => {
		const invalidInputs = trackedInputs.filter(input => {
			return isInvalid(input) ? input : false;
		});

		console.log(invalidInputs)
		if (invalidInputs && invalidInputs?.length > 0) {
			setHasError(true);
			setInvalidFields(invalidInputs)
			return;
		}

		if (hasError) {
			console.log('setting form error false');
			setHasError(false);
			setInvalidFields([]);
		}
	}

	const checkAndApplyOverwrites = (input: ValidationObj, field: ValidationOptions): boolean => {
		if (
			field?.applySpecificallyTo?.includes(String(input.inputName)) &&
			field.overwriteValidation
		) {
			return field.overwriteValidation(input);
		}

		return false;
	}; 

	const isEmpty = (input: ValidationObj): boolean => ( !input.input || input.input === 0 ) ? true : false;

	const validateEmail = (input: ValidationObj) => {
		const testResult = CONSTANTS.EMAIL_REGEX.test(String(input.input));
		return !testResult;
	}

	const isInvalid = (input: ValidationObj): boolean => {
		// These type specific validations return true if the field is invalid
		// with regard to the type of input
		switch (input.inputType) {
			case InputType.Name: {
				if (isEmpty(input) && input.isRequired) {
					return true;
				};

				let isInvalid = false;
				const extraValidations = nameField?.extraValidations
					?.map(validationFn => validationFn(input))
					.some(validation => validation) ?? false
				
				// If there are overwrites and a specific field to apply them to
				// use this route
				if (
					nameField?.overwriteValidation &&
					nameField?.applySpecificallyTo &&
					nameField.applySpecificallyTo.includes(input.inputName)
				) {
					return checkAndApplyOverwrites(input, nameField) || extraValidations;
				}

				// If there are overwrites then they should
				// completely override stock validation
				if (nameField?.overwriteValidation) {
					console.log('in here')
					return nameField.overwriteValidation(input) || extraValidations;
				}

				// Stock Validation
				if (String(input.input).length > CONSTANTS.MAX_NAME_LENGTH) {
					isInvalid = true;
				}

				return isInvalid || extraValidations;
			}
			case InputType.SSN: {
				// SSN Validation
				if (isEmpty(input) && input.isRequired) {
					return true;
				};
				
				if (ssnField?.overwriteValidation) {
					const result = ssnField.overwriteValidation(input)

					return result ? true : false;
				}
				return false;
			}
			case InputType.Date: {
				// Date Validation
				if (isEmpty(input) && input.isRequired) {
					return true;
				};

				if (dateField?.overwriteValidation) {
					const result = dateField.overwriteValidation(input)
					
					return result ? true : false;
				}
				return false;
			}
			case InputType.Email: {
				// Email Validation
				let isInvalid = false;

				if (isEmpty(input) && input.isRequired) {
					return true;
				};

				if (!isEmpty(input)) {
					if (emailField?.overwriteValidation) {
						const result = emailField.overwriteValidation(input)
						
						return result ? true : false;
					}

					isInvalid = validateEmail(input);

					return isInvalid;
				}

				return isInvalid
			}
			default:
				// Should never get here
				return false;
		}
	}

	return {
		isEmpty,
		isInvalid,
		hasError,
		invalidFields,
		runValidations,
	}
};

export default useGenericFormVaidation;
import * as React from 'react';
// import { useStore, useDispatch } from '../StepStore/testStore';
import { useStore } from '../StepStore/testStore';
import SubComponent from '../../SubComponent';
import Input from '../../Input';
import useStoreManagement from '../hooks/useStoreManagement/useStoreManagement';

import styles from './styles.module.css';

const ComponentTwo = () => {
	const store = useStore();
	// const dispatch = useDispatch();

	const {
		formEditFunctionsComponentThree,
	} = useStoreManagement();

	return (
		<div className={styles.componentThreeBox}>
			<div>
				<h2>Component Three</h2>
				<h3>State:</h3>
				<code>
					<pre className={styles.jsonContainer}>
						{JSON.stringify(store, null, '\t')}
					</pre>
				</code>
			</div>

			<section className={styles.box}>
				<span>Component One Controls:</span>
				<Input changeHandle={formEditFunctionsComponentThree.changeTextInput} value={store.textInput} />
				<label htmlFor="">
					FirstName:
					<Input changeHandle={formEditFunctionsComponentThree.changeFirstName} value={store.firstName} />
				</label>
				<label htmlFor="">
					LastName:
					<Input changeHandle={formEditFunctionsComponentThree.changeLastName} value={store.lastName} />
				</label>
				<button type="submit" onClick={formEditFunctionsComponentThree.submitMockForm}>
					Submit
				</button>
			</section>

			<SubComponent parentComponentName="ComponentTwo" />
		</div>
	)
}

export default ComponentTwo

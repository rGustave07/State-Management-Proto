import * as React from 'react'
import { useStore, useDispatch } from '../StepStore/testStore';
import SubComponent from '../../SubComponent';
import Btn from '../../Btn/Btn';

import styles from './styles.module.css';

const ComponentOne = () => {
	const store = useStore();
	const dispatch = useDispatch();

	const increment = (): void => {
		dispatch({type: 'increment'})
	}

	return (
		<div className={styles.componentOneBox}>
			<div>
				<h2>Component One</h2>
				<h3>State:</h3>
				<pre className={styles.jsonContainer}>
					{JSON.stringify(store, null, '\t')}
				</pre>
			</div>

			<section className={styles.box}>
				<span>Component One Controls:</span>
				<Btn clickHandle={increment}>Dispatch Increment</Btn>
			</section>

			<SubComponent parentComponentName="ComponentOne"/>
		</div>
	)
}

export default ComponentOne

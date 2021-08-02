import * as React from 'react';
import useStoreManagement from '../hooks/useStoreManagement/useStoreManagement';
import SubComponent from '../../SubComponent';
import Btn from '../../Btn/Btn';

import styles from './styles.module.css';
import Input from '../../Input';

const ComponentTwo = () => {
	const {
		store,
		formEditFunctionsComponentTwo,
	} = useStoreManagement();

	return (
		<div className={styles.componentTwoBox}>
			<div>
				<h2>Component Two</h2>
				<h3>State:</h3>
				<pre className={styles.jsonContainer}>
					{JSON.stringify(store, null, '\t')}
				</pre>
			</div>

			<section className={styles.box}>
				<span>Component One Controls:</span>
				<Btn clickHandle={formEditFunctionsComponentTwo.decrementCount}>Dispatch Decrement</Btn>
				<label htmlFor="">
					email:
					<Input changeHandle={formEditFunctionsComponentTwo.changeEmail} value={store.email} />
				</label>
			</section>

			<SubComponent parentComponentName="ComponentTwo" />
		</div>
	)
}

export default ComponentTwo

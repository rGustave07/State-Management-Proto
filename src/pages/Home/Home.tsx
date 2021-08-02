import React from 'react'

import ComponentOne from '../../components/StepComponents/ComponentOne';
import ComponentTwo from '../../components/StepComponents/ComponentTwo';
import ComponentThree from '../../components/StepComponents/ComponentThree';

import styles from './Home.module.css';
import StoreProvider from '../../components/StepComponents/StepStore/testStore';

const Home = () => {
	return (
		<>
			<StoreProvider>
				<h1>State-Management with useReducer/useContext</h1>
				<div className={styles.containerBox}>
					<ComponentOne />
					<ComponentTwo />
					<ComponentThree />
				</div>
			</StoreProvider>
		</>
	)
}

export default Home

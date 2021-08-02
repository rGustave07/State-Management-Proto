import * as React from 'react';
import styles from './styles.module.css';

interface Props {
	clickHandle: () => void;
	children: React.ReactNode;
}

const Btn = (props: Props): JSX.Element => {
	const {
		clickHandle,
		children
	} = props;

	return (
		<button onClick={clickHandle} className={styles.btn}>
			{children}
		</button>
	)
}

export default Btn;
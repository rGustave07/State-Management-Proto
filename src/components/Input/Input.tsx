import * as React from 'react';

import styles from './styles.module.css';

interface Props {
	changeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string,
}

const Input = (props: Props) => {
	const {
		changeHandle,
		value
	} = props;

	return (
		<input className={styles.input} type="text" onChange={changeHandle} value={value}/>
	)
}

export default Input

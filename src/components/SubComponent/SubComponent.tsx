import React from 'react'

import styles from './styles.module.css'

interface Props {
	parentComponentName: string;
}

const SubComponent = (props: Props): JSX.Element => {
	const { parentComponentName } = props;

	return (
		<div className={styles.subComp}>
			<div>SubComponent of {parentComponentName}</div>
			<br />
			<span>controls:</span>
		</div>
	)
}

export default SubComponent

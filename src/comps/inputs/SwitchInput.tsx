import * as React from "react";

import * as css from "./SwitchInput.module.css";

interface SwitchOptions {
	[index: string]: string | number;
}

interface SwitchInputProps {
	options: SwitchOptions;
	backgroundColorContainer?: string;
	backgroundColorSelection?: string;
	onSwitchChange: (value: string | number) => void;
}

export const SwitchInput: React.FC<SwitchInputProps> = ({
	options,
	backgroundColorContainer,
	backgroundColorSelection,
	onSwitchChange,
}) => {
	const [value, setValue] = React.useState(Object.values(options)[0]);
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		onSwitchChange(value);
	}, [value]);

	return (
		<div
			className={`${css.Container}`}
			style={{
				backgroundColor: backgroundColorContainer,
			}}
		>
			<span
				className={`${css.Selection}`}
				style={{
					transform: `translateX(${index}00%)`,
					backgroundColor: backgroundColorSelection,
				}}
			></span>
			{Object.entries(options).map(([key, value], i) => (
				<button
					key={i}
					className={`${css.Option}`}
					onClick={() => {
						setIndex(i);
						setValue(value);
					}}
				>
					<span className={`${css.OptionText}`}>{key}</span>
				</button>
			))}
		</div>
	);
};

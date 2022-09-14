import * as React from "react";
import { useInput } from "jwe-react-form";

import * as css from "./TextInput.module.css";

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
	containerClass?: string;
	containerId?: string;
	id: string;
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
	containerClass,
	containerId,
	label,
	id,
	...props
}) => {
	const { inputValue, isEmpty, isFocused, onInputChange, setIsFocused } = useInput();

	return (
		<div
			className={`${css.Container}${containerClass ? ` ${containerClass}` : ""}`}
			id={containerId}
		>
			<label htmlFor={id} className={css.Label}>
				{label}
			</label>
			<input
				{...props}
				id={id}
				className={`${css.Input}${props.className ? ` ${props.className}` : ""}`}
			/>
		</div>
	);
};

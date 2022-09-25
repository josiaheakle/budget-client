import * as React from "react"
import { useInputValue } from "../../hooks/InputHooks"

import * as css from "./TextInput.module.css"

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
	containerClass?: string
	containerId?: string
	id: string
	label: string
	errors?: Array<string>
	onInputChange: (value: string | undefined) => void
}

export const TextInput: React.FC<TextInputProps> = ({
	containerClass,
	containerId,
	errors,
	label,
	id,
	onInputChange,
	...props
}) => {
	// Used to check for autofill values on initial load
	const inputRef = React.createRef<HTMLInputElement>()

	const [inputValue, onChange, setInputValue] = useInputValue()
	const [isEmpty, setIsEmtpy] = React.useState(true)
	const [isFocused, setIsFocused] = React.useState(false)

	React.useEffect(() => {
		if (props.value) setInputValue(props.value as string)
	}, [props.value])

	// Check for value and set isEmpty accordingly
	React.useEffect(() => {
		onInputChange(inputValue)
		if (inputValue && inputValue.length > 0) setIsEmtpy(false)
		else setIsEmtpy(true)
	}, [inputValue])

	// Check for initial value and set input value
	React.useEffect(() => {
		setTimeout(() => {
			if (inputRef.current?.matches(":-internal-autofill-selected")) setIsEmtpy(false)
		}, 500)
	}, [])

	return (
		<div
			className={`${css.Container}${containerClass ? ` ${containerClass}` : ""}${
				!isEmpty || isFocused ? ` ${css.focused}` : ""
			}`}
			id={containerId}
		>
			<label htmlFor={id} className={css.Label}>
				{label}
			</label>
			<input
				name={id}
				{...props}
				value={inputValue}
				ref={inputRef}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={onChange}
				id={id}
				className={`${css.Input}${props.className ? ` ${props.className}` : ""}`}
			/>
			{errors ? (
				<div className={`${css.Errors}`}>
					{errors.map((error, i) => (
						<span key={i} className={`${css.Error}`}>
							{error}
						</span>
					))}
				</div>
			) : null}
		</div>
	)
}

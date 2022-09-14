import React from "react";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
/**
 * If I were to convert to array
 * [
 *  boolean,
 *  (isFocused: boolean) => void,
 *  (e: InputChangeEvent) => void
 * ]
 */

export const useIsInputFocused = () => {
	/**
	 * Works in tandem with the input labels, must check if empty as well as focusing.
	 */
	const [isFocused, setIsFocused] = React.useState(false);
	const [isEmpty, setIsEmpty] = React.useState(true);

	const [isInputFocused, setIsInputFocused] = React.useState(true);

	const onInputChange = (e: InputChangeEvent) => {
		setIsEmpty(!(e.target.value.length > 0));
	};

	React.useEffect(() => {
		setIsInputFocused(isFocused || !isEmpty);
	}, [isFocused, isEmpty]);

	return {
		isFocused: isInputFocused,
		isEmpty,
		setIsFocused,
		onInputChange,
	};
};

export const useInputValue = (): [string | undefined, (e: InputChangeEvent) => void] => {
	/**
	 * Gets the value of the input from each input change event
	 */
	const [inputValue, setInputValue] = React.useState<string>();

	const onInputChange = (e: InputChangeEvent) => {
		setInputValue(e.target.value);
	};

	return [inputValue, onInputChange];
};

/**
 * Checks if input is empty, when the input changes and returns all in a destructurable array
 *
 */
export const useInput = () => {
	const focusEffects = useIsInputFocused();
	const [inputValue, onInputChange] = useInputValue();
	return {
		inputValue,
		...focusEffects,
		onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			onInputChange(e);
			focusEffects.onInputChange(e);
		},
	};
};

import * as React from "react"

import * as css from "./Button.module.css"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
	return <button {...props} className={`${css.Button}${` ${props.className}` || ""}`}></button>
}

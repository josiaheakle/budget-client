import * as React from "react"

import * as css from "./Button.module.css"

interface MenuButtonProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, setIsOpen }) => {
	return (
		<button
			className={`${css.MenuButton} ${isOpen ? "open" : ""}`}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div />
			<div />
			<div />
		</button>
	)
}

export { MenuButton }

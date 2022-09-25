import * as React from "react"

import * as css from "./NewContent.module.css"

interface NewContentButtonProps {
	isActive: boolean
	setIsActive: (bool: boolean) => void
}

const NewContentButton: React.FC<NewContentButtonProps> = ({ isActive, setIsActive }) => {
	return <button className={`${css.Button}`}>+</button>
}

export { NewContentButton }

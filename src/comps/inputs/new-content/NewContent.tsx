import * as React from "react"

import * as css from "./NewContent.module.css"
import { NewContentButton } from "./NewContentButton"

type ContentType = "expense" | "expense-category"

interface NewContentProps {
	onNewContent: (contentType: ContentType) => void
}

const NewContent: React.FC<NewContentProps> = ({}) => {
	// true if user has clicked new content button, show new content options if true
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	return (
		<div className={`${css.NewContent}`}>
			<NewContentButton isActive={isOpen} setIsActive={setIsOpen} />
		</div>
	)
}

export { NewContent }

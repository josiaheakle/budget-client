import * as React from "react"

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

const Page: React.FC<PageProps> = ({ children, ...props }) => {
	return (
		<div {...props} className={`page ${props.className ?? ""}`}>
			{children}
		</div>
	)
}

export { Page }

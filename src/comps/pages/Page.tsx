import * as React from "react"
import { Header } from "../header/Header"

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
	return (
		<div className={`page`}>
			<Header />
		</div>
	)
}

export { Page }

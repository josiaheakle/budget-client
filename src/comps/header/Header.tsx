import * as React from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/UserHooks"

import * as css from "./Header.module.css"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
	const user = useUser()

	return (
		<header className={`${css.Header}`}>
			<a className={`${css.AccountLink}`} href="#">{`${user?.firstName} ${user?.lastName}`}</a>
			<Link to="/expenses">expenses</Link>
		</header>
	)
}

export { Header }

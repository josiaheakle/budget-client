import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { MenuButton } from "../inputs/buttons/MenuButton"
import * as css from "./Header.module.css"

interface NavProps {}

const pages = {
	Dashboard: "/",
	"My Expenses": "/expenses",
	"Manage Budget": "/budget",
	"My Account": "/account",
}

const Nav: React.FC<NavProps> = ({}) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const pageRoute = useLocation()

	return (
		<div className={`${css.Nav} ${isOpen ? "open" : ""}`}>
			<MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
			<ul className={`${css.NavLinks}`}>
				{Object.entries(pages).map(([display, route], i) => (
					<li className={`${css.NavLink}`} style={{ transitionDelay: `${100 * i}ms` }}>
						{pageRoute.pathname === route ? (
							<span key={i}>{display}</span>
						) : (
							<Link to={route} key={i} onClick={() => setIsOpen(false)}>
								{display}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export { Nav }

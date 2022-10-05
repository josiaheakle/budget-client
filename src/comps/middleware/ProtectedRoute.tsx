/**
 * Wraps any route which required user to be logged in.
 * Redirects any unauthorized users to /login
 */

import * as React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Nav } from "../header/Nav"

interface ProtectedRouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({}) => {
	return (
		<UserContext.Consumer>
			{({ user, isLoading }) => {
				console.log({ user, isLoading })
				if (!user && !isLoading) return <Navigate to="/login" />
				else if (user)
					return (
						<>
							<Nav />
							<Outlet />
						</>
					)
			}}
		</UserContext.Consumer>
	)
}

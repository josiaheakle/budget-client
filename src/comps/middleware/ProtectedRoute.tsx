/**
 * Wraps any route which required user to be logged in.
 * Redirects any unauthorized users to /login
 */

import * as React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

interface ProtectedRouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({}) => {
	return (
		<UserContext.Consumer>
			{({ user, isLoading }) => {
				if (!user && !isLoading) return <Navigate to="/login" />
				else if (user) return <Outlet />
			}}
		</UserContext.Consumer>
	)
}

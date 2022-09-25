/**
 * Gets user data
 */

import * as React from "react"
import { UserHandler } from "../modules/UserHandler"

import { User } from "../../../shared/types/ClientModels"
import { useAsyncEffect } from "./ReactHelperHooks"

export function useUser() {
	const [user, setUser] = React.useState<User>()

	React.useEffect(() => {
		return UserHandler.addCallback((u) => setUser(u))
	}, [])

	useAsyncEffect(async () => {
		const refreshUser = await UserHandler.getUser()
		setUser(refreshUser)
	}, [])

	return user
}

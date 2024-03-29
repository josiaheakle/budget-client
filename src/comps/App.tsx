import * as React from "react"
import { Toaster } from "react-hot-toast"

import Router from "./pages/Router"
import { UserContext } from "../context/UserContext"
import { useAsyncEffect } from "../hooks/ReactHelperHooks"
import { UserHandler } from "../modules/UserHandler"

import { User } from "../../../shared/types/ClientModels"

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
	const [user, setUser] = React.useState<User | undefined>(undefined)
	const [isLoading, setIsLoading] = React.useState(true)

	useAsyncEffect(async () => {
		try {
			const u = await UserHandler.getUser()
			setUser(u)
		} catch (e) {
			console.error("USER was not retrieved from server!!!", e)
			setUser(undefined)
		}
		setIsLoading(false)
	}, [])

	return (
		<UserContext.Provider value={{ user, isLoading }}>
			<Toaster position="bottom-left" />
			<Router />
		</UserContext.Provider>
	)
}

export default App

import * as React from "react"
import { User } from "src/types/User"

export const UserContext = React.createContext<{
	user: User | undefined
	isLoading: boolean
}>({ user: undefined, isLoading: false })

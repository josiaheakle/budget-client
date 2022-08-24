import * as React from "react";
import { User } from "src/types/User";

export const UserContext = React.createContext<{
	user: User | null;
	isLoading: boolean;
}>({ user: null, isLoading: false });

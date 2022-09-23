/**
 * route "/"
 * ---
 * Must be logged in to access this page.
 * Central page to access all other pages (besides login).
 */

import * as React from "react"
import { ExpenseCategoryForm } from "../../forms/ExpenseCategoryForm"
import { useInputValue } from "../../../hooks/InputHooks"
import { TextInput } from "../../inputs/TextInput"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
	const [input, setInput] = React.useState<string>()

	return (
		<div className="page">
			<ExpenseCategoryForm />
		</div>
	)
}

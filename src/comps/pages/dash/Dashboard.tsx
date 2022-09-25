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
import { ExpenseCategoryList } from "../expenses/ExpenseCategoryList"
import { ExpenseCategory } from "../../../../../shared/types/ClientModels"
import { useUser } from "../../../hooks/UserHooks"
import { DataController } from "../../../modules/DataController"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
	const [editCategory, setEditCategory] = React.useState<ExpenseCategory>()

	const user = useUser()

	React.useEffect(() => {
		DataController.refreshModels()
		console.log({ editCategory })
	}, [editCategory])

	return (
		<div className="page">
			<span>{user?.firstName}</span>
			<ExpenseCategoryForm editExpenseCategory={editCategory} />
			<ExpenseCategoryList onEdit={(cat) => setEditCategory(cat)} />
		</div>
	)
}

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

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
	const [editCategory, setEditCategory] = React.useState<ExpenseCategory>()

	React.useEffect(() => {
		console.log({ editCategory })
	}, [editCategory])

	return (
		<div className="page">
			<ExpenseCategoryForm editExpenseCategory={editCategory} />
			<ExpenseCategoryList onEdit={(cat) => setEditCategory(cat)} />
		</div>
	)
}

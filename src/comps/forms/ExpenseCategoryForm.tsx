import * as React from "react"

import { ExpenseCategory } from "../../../../shared/types/ClientModels"
import { formFetch } from "../../modules/util/FetchUtil"

interface ExpenseCategoryFormProps {
	editExpenseCategory?: ExpenseCategory
	postSubmit?: () => {}
}

export const ExpenseCategoryForm: React.FC<ExpenseCategoryFormProps> = ({}) => {
	const onSubmit = (e: React.FormEvent) => {
		formFetch
	}

	return <form onSubmit={onSubmit}></form>
}

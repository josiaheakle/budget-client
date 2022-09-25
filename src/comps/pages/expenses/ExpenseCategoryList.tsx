import * as React from "react"
import { ExpenseCategory } from "../../../../../shared/types/ClientModels"

import { useAllData } from "../../../hooks/DataHooks"

import * as css from "./ExpenseCategoryList.module.css"

interface ExpenseCategoryListProps {
	onEdit: (cateogry: ExpenseCategory) => void
}

const ExpenseCategoryList: React.FC<ExpenseCategoryListProps> = ({ onEdit }) => {
	const [categories, updateCategory] = useAllData<ExpenseCategory>("expense-category")

	return (
		<ul className={`${css.List}`}>
			{categories?.map((category, i) => (
				<li key={i}>
					{category.name} <button onClick={() => onEdit(category)}>change</button>
				</li>
			))}
		</ul>
	)
}

export { ExpenseCategoryList }

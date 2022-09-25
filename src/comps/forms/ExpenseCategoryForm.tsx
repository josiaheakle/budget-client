import * as React from "react"
import { updateRoute } from "../../modules/util/PathUtil"

import { ExpenseCategory } from "../../../../shared/types/ClientModels"
import { Data, RequestErrors, ServerResponse } from "../../../../shared/types/ServerResponse"
import { TextInput, Button } from "../inputs"
import { DataController } from "../../modules/DataController"

interface ExpenseCategoryFormProps {
	editExpenseCategory?: ExpenseCategory
	postSubmit?: (data: ServerResponse) => void
}

export const ExpenseCategoryForm: React.FC<ExpenseCategoryFormProps> = ({
	editExpenseCategory,
	postSubmit,
}) => {
	const [name, setName] = React.useState<string | undefined>(editExpenseCategory?.name ?? "")
	const [errors, setErrors] = React.useState<RequestErrors>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let updateData: Data = {
			name,
		}
		if (editExpenseCategory) updateData.uuid = editExpenseCategory.uuid
		const res = await DataController.models["expense-category"].updateServerData(updateData, true)
		if (!res.isValid) setErrors(res.errors)
		else if (postSubmit) postSubmit(res)
	}

	React.useEffect(() => {
		setName(editExpenseCategory?.name ?? "")
	}, [editExpenseCategory])

	return (
		<form className="flex-column flex-center" onSubmit={submit}>
			<TextInput
				id="category-name-input"
				label="Title"
				errors={errors?.name ?? undefined}
				value={name}
				onInputChange={setName}
			/>
			<Button>Submit</Button>
		</form>
	)
}

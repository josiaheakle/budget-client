import * as React from "react"
import { updateRoute } from "../../modules/util/PathUtil"

import { ExpenseCategory } from "../../../../shared/types/ClientModels"
import { RequestErrors, ServerResponse } from "../../../../shared/types/ServerResponse"
import { formFetch, updateServerData } from "../../modules/util/FetchUtil"
import { TextInput } from "../inputs/TextInput"
import { Button } from "../inputs/Button"

interface ExpenseCategoryFormProps {
	editExpenseCategory?: ExpenseCategory
	postSubmit?: (data: ServerResponse) => {}
}

export const ExpenseCategoryForm: React.FC<ExpenseCategoryFormProps> = ({
	editExpenseCategory,
	postSubmit,
}) => {
	const [name, setName] = React.useState<string | undefined>(editExpenseCategory?.name)
	const [errors, setErrors] = React.useState<RequestErrors>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const res = await updateServerData(
			"expense-category",
			{
				name,
			},
			true
		)
		console.log({ res })
		if (!res.isValid) setErrors(res.errors)
		else if (postSubmit) postSubmit(res)
	}

	return (
		<form className="flex-column flex-center" onSubmit={submit}>
			<TextInput
				id="category-name-input"
				label="Title"
				errors={errors?.name ?? undefined}
				onInputChange={setName}
			/>
			<Button>Submit</Button>
		</form>
	)
}

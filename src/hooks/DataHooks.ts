import * as React from "react"

import { DataType } from "../types/DataType"
import { ModelBase } from "../../../shared/types/ClientModels"
import { useAsyncEffect } from "./ReactHelperHooks"
import { DataController } from "../modules/DataController"

export function useData<T extends ModelBase>(dataType: DataType, uuid?: string) {
	const [data, setData] = React.useState<T | Array<T>>()

	async function updateData(data: T) {
		try {
			await DataController.models[dataType].updateServerData(data)
			return true
		} catch (e) {
			console.error("Error updating data.", e)
			return false
		}
	}

	useAsyncEffect(async () => {
		const freshData = await DataController.getData<T>(dataType, uuid)
		setData(freshData)
	}, [])

	return [data, updateData]
}

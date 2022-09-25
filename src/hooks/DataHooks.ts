import * as React from "react"

import { DataType } from "../types/DataType"
import { ModelBase } from "../../../shared/types/ClientModels"
import { useAsyncEffect } from "./ReactHelperHooks"
import { DataController } from "../modules/DataController"
import { useParams } from "react-router-dom"

export function useData<T extends ModelBase>(
	dataType: DataType,
	uuid?: string
): [T | Array<T> | undefined, (data: T) => void] {
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

	React.useEffect(() => {
		const removeCallback = DataController.models[dataType].onUpdate((data) => {
			setData(data)
		}, uuid ?? "all")
		return removeCallback
	}, [])

	useAsyncEffect(async () => {
		const freshData = await DataController.getData<T>(dataType, uuid)
		setData(freshData)
	}, [])

	return [data, updateData]
}

export function useAllData<T extends ModelBase>(
	dataType: DataType
): [Array<T> | undefined, (data: T) => void] {
	const [data, updateData] = useData<T>(dataType) as [Array<T> | undefined, (data: T) => void]
	return [data, updateData]
}

export function useRouteData<T extends ModelBase>(
	dataType: DataType
): [T | undefined, (data: T) => void] {
	const { uuid } = useParams()
	const [data, updateData] = useData<T>(dataType, uuid) as [T | undefined, (data: T) => void]
	return [data, updateData]
}

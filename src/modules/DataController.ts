import { DataType } from "src/types/DataType"
import {
	Budget,
	Expense,
	ExpenseCategory,
	ModelBase,
	User,
} from "../../../shared/types/ClientModels"
import { UserHandler } from "./UserHandler"
import { easyFetch, updateServerData } from "./util/FetchUtil"
import { updateRoute } from "./util/PathUtil"

class DataModel<T extends ModelBase> {
	public dataType: DataType
	public data: Array<T>
	private apiPath: string
	private updateCallbacks: {
		[index: string]: Array<(data: T | Array<T>) => void>
	} = {}
	constructor(dataType: DataType) {
		this.apiPath = updateRoute(dataType)
		this.dataType = dataType
		this.data = []
	}

	/**
	 * Returns data of specified uuid
	 * @param uuid String
	 * @returns data of specified uuid
	 */
	getByUUId(uuid: string) {
		return this.data.find((d) => d.uuid === uuid)
	}

	/**
	 * Updates the data instance for the data within the data model
	 * @param data
	 */
	private updateData(data: T) {
		console.log({ dataBefore: this.data, newData: data })
		const dataCutArray = this.data.filter((d) => d.uuid !== data.uuid)
		console.log({ dataCutArray })
		dataCutArray.push(data)
		this.data = dataCutArray
		if (this.updateCallbacks.hasOwnProperty(data.uuid)) {
			for (const cb of this.updateCallbacks[data.uuid]) {
				cb(data)
			}
		}
		if (this.updateCallbacks.hasOwnProperty("all")) {
			for (const cb of this.updateCallbacks["all"]) {
				cb(this.data)
			}
		}
	}

	/**
	 * Updates data on server with specified data instance
	 * @param data data to update
	 * @param doToast toast server response message?
	 */
	async updateServerData(data: T, doToast?: boolean) {
		const res = await updateServerData(this.dataType, data, doToast)
		if (res.isValid) this.updateData(res.data as T)
		return res
	}

	/**
	 * Gets all data from server
	 */
	async getServerData() {
		const res = await easyFetch(
			this.apiPath,
			UserHandler.createRequestInit({
				method: "GET",
			})
		)
		if (res.isValid) this.data = res.data as Array<T>
		else throw `Unable to get server data for ${this.dataType}`
	}

	/**
	 * Creates a callback for updating state when data updates
	 * @param callback function to be called when data updates
	 * @param uuid UUID of data to update
	 * @returns function to call in order to remove callback
	 */
	onUpdate(callback: (data: T | Array<T>) => void, uuid: string) {
		if (!this.updateCallbacks.hasOwnProperty(uuid)) this.updateCallbacks[uuid] = []
		this.updateCallbacks[uuid].push(callback)
		const removeCallback = () => {
			const removeIndex = this.updateCallbacks[uuid].findIndex((cb) => cb === callback)
			delete this.updateCallbacks[uuid][removeIndex]
		}
		return removeCallback
	}
}

export abstract class DataController {
	static models: { [key in DataType]: DataModel<any> } = {
		"expense-category": new DataModel<ExpenseCategory>("expense-category"),
		expense: new DataModel<Expense>("expense"),
		budget: new DataModel<Budget>("budget"),
		user: new DataModel<User>("user"),
	}

	static getData<T extends ModelBase>(dataType: DataType, uuid?: string) {
		const model = this.models[dataType]
		if (uuid) return model.getByUUId(uuid) as T
		else return model.data as Array<T>
	}

	static async initModels() {
		console.log("inititating models", this.models)
		try {
			for (const model of Object.values(this.models)) {
				console.log({ model })
				await model.getServerData()
			}
		} catch (e) {
			console.error(e)
		}
	}
}

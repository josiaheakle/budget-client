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
	constructor(dataType: DataType) {
		this.apiPath = updateRoute(dataType)
		this.dataType = dataType
		this.data = []
	}

	getByUUId(uuid: string) {
		return this.data.find((d) => d.uuid === uuid)
	}

	private updateData(data: T) {
		const dataCutArray = this.data.filter((d) => d.uuid !== data.uuid)
		dataCutArray.push(data)
		this.data = dataCutArray
	}

	async updateServerData(data: T) {
		const res = await easyFetch(
			this.apiPath,
			UserHandler.createRequestInit({
				method: "post",
				body: JSON.stringify(data),
			})
		)
		if (res.isValid) this.updateData(data)
		else throw "Could not update server data."
	}

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
}

export abstract class DataController {
	static models: { [key in DataType]: DataModel<any> } = {
		expense: new DataModel<Expense>("expense"),
		"expense-category": new DataModel<ExpenseCategory>("expense-category"),
		budget: new DataModel<Budget>("budget"),
		user: new DataModel<User>("user"),
	}

	static getData<T extends ModelBase>(dataType: DataType, uuid?: string) {
		const model = this.models[dataType]
		if (uuid) return model.getByUUId(uuid) as T
		else return model.data as Array<T>
	}

	static async initModels() {
		for (const model of Object.values(this.models)) {
			await model.getServerData()
		}
	}
}

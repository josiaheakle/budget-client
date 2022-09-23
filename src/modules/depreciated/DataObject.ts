import DataManager from "./DataManager"
import { DataSchema, DataType } from "../../types/DataSchema"
import { ServerResponse } from "../../../../shared/types/ServerResponse"

/**
 * DataObject
 * Extend from this object to create easily managable objects which have 'link' methods,
 * which make updating and creating these objects simple on the front-end
 *
 * @usage
 * Create a new class extending off of this object,
 * add a schema property, defining the data structure of this object
 * Pass a TypeScript interface/type which defines the schema as for full TS support
 * ---
 * @autor Josiah Eakle
 * @date 9/11/2022
 */
export default abstract class DataObject<T extends DataType> {
	public schema: DataSchema
	public data: T
	public apiPath: string
	private dataManager: DataManager<ServerResponse>
	constructor(config: {
		apiPath: string
		dataManager: DataManager<ServerResponse>
		data: T
		schema: DataSchema
	}) {
		if (!config.apiPath) throw `No apiPath found in ${this.constructor.name}.`
		if (!config.data) throw `No data passed to ${this.constructor.name}`
		if (!config.dataManager) throw `No DataManager passed to ${this.constructor.name}`
		if (!config.schema) throw `No DataManager passed to ${this.constructor.name}`
		this.apiPath = config.apiPath
		this.data = config.data
		this.dataManager = config.dataManager
		this.schema = config.schema
	}

	public getDataJson() {
		return JSON.stringify(this.data)
	}

	/**
	 * Updates to the server, assuming the response will return the same data object
	 */
	public async serverUpdate() {
		const res = await this.dataManager.serverUpdateObject(this)
		if (res.isValid) this.data = res.data as T
	}

	/**
	 * Creates on the server, assuming the response will return the same data object
	 */
	public async serverCreate() {
		const res = await this.dataManager.serverCreateObject(this)
		if (res.isValid) this.data = res.data as T
	}
}

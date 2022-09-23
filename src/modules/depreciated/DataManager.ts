/**
 * DataManager
 * Create instance of this class to have a centralized place to manage your DataObjects
 * This class will interface with the server to update and retreive the data
 *
 * Uses JWT token to authenticate requests
 *
 *
 * @author Josiah Eakle
 * @date 9/11/2022
 */

import DataObject from "./DataObject"

export interface DataType {
	[index: string]: string | number | DataType
}

export interface DataSchema {
	[index: string]: String | Number | typeof DataObject
}

export default class DataManager<ServerResponse> {
	private apiUrl: string
	private token: string
	constructor(apiUrl: string, jwtToken: string) {
		this.apiUrl = apiUrl
		this.token = jwtToken
	}

	/**
	 * Calls server with specified path and config
	 * @param path API path
	 * @param config fetch config
	 * @returns server reponse parsed to json
	 */
	private async callEndpoint(path: RequestInfo | URL, config?: RequestInit) {
		const init: RequestInit = this.createRequestInit(config)
		const res = await fetch(`${this.apiUrl}/${path}`, init)
		const data: ServerResponse = await res.json()
		return data
	}

	/**
	 * Creates request init object to use with fetch applying JWT as auth
	 * @param init fetch RequestInit object to apply headers to
	 */
	private createRequestInit(init?: RequestInit): RequestInit {
		if (!this.token) throw `No JWT in UserHandler to create request init.`
		const headers: HeadersInit = {
			Authorization: `Bearer ${this.token}`,
		}
		const initHeaders = init?.headers
		if (initHeaders) {
			for (const [key, val] of Object.entries(initHeaders)) {
				headers[key] = val
			}
		}
		return { ...init, headers }
	}

	/**
	 * Updates the passed data object on server with object data
	 * @param dataObj DataObject you wish to update
	 */
	async serverUpdateObject<T extends DataType>(dataObj: DataObject<T>) {
		return await this.callEndpoint(dataObj.apiPath, {
			method: "PUT",
			body: dataObj.getDataJson(),
		})
	}

	/**
	 * Creates the passed data object on server
	 * @param dataObj DataObject you wish to update
	 */
	async serverCreateObject<T extends DataType>(dataObj: DataObject<T>) {
		return await this.callEndpoint(dataObj.apiPath, {
			method: "POST",
			body: dataObj.getDataJson(),
		})
	}
}

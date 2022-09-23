/**
 * PathUtil has multiple functions which make generating paths for both front and backend routes properly
 */

import { DataType } from "../../types/DataType"

/**
 * Returns path to view specified data (front-end route)
 * @param dataType Name of data type being viewed
 * @param view If viewing or editing the data
 * @param uuid The UUID of the data being viewed or edited
 */
export function routeData(dataType: DataType, view: "view" | "edit", uuid?: string) {
	return `/${dataType}/${view}${uuid ? `/${uuid}` : ""}`
}

/**
 * Returns path to make update request for specified data type
 * @param dataType Name of data type being viewed
 */
export function updateRoute(dataType: DataType) {
	const dataRoute: {
		[key in DataType]: string
	} = {
		"expense-category": "/expense/category",
		budget: "",
		expense: "",
		user: "/auth/user",
	}
	return dataRoute[dataType]
}

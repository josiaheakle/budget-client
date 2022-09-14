import DataObject from "../modules/DataObject";

export interface DataType {
	[index: string]: string | number | DataType;
}

export interface DataSchema {
	[index: string]: String | Number | typeof DataObject;
}

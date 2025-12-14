export function getTableUniqueKey(dataIndex: any) {
	return `${Array.isArray(dataIndex) ? dataIndex.join("_") : dataIndex}`
}

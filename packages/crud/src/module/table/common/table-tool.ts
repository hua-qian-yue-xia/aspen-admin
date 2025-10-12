export function getTableUniqueKey(dataIndex: any) {
	return `table_unique_${Array.isArray(dataIndex) ? dataIndex.join("_") : dataIndex}`
}

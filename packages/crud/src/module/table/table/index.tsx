import { Table } from "antd"
import type { CrudColumn } from "./prop"

export type CurdTableProps<Entity> = {
	columns?: Array<CrudColumn<Entity>>
	tableRef?: React.MutableRefObject<any>
}

function CrudTable<Entity extends Record<string, any>>(props: CurdTableProps<Entity>) {
	const { columns, tableRef } = props

	const tableColumns = useMemo(() => {
		const loopFilter = (column: Array<any>): Array<any> => {
			return column.map((item) => {
				if (item.children) {
					return {
						...item,
						children: loopFilter(item.children),
					}
				}
				return item
			})
		}
		return loopFilter(columns)
	}, [columns])

	const getTableProps = () => {
		return {
			columns: tableColumns,
		}
	}

	return <Table style={{ width: "100%", height: "100%" }} {...getTableProps()} ref={tableRef} />
}

export default CrudTable

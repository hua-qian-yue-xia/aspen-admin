import { useMemo } from "react"

import { ProTable } from "@ant-design/pro-components"
import type { ProTableProps } from "@ant-design/pro-components"

import TableRefresh from "./components/table-refresh"
import TableFullScreen from "./components/table-full-screen"
import TableOtherSetting from "./components/table-other-setting"
import TableColumsSetting from "./components/table-colums-setting"

import { CrudTableProvider, useCrudTableContext } from "./common/context"
import type { CrudTableSortColum } from "./common/context"
import { getTableUniqueKey } from "./common/table-tool"

import "./style/crud-table.scss"

const CrudTableBody = <T extends Record<string, any>, U, ValueType>(props: ProTableProps<T, U, ValueType>) => {
	const { columns, ...rest } = props

	const crudTableContext = useCrudTableContext()

	const getProps = (): ProTableProps<T, U, ValueType> => {
		return {
			...rest,
			defaultSize: crudTableContext.tableSize,
			bordered: crudTableContext.tableBordered,
		}
	}

	const tableColumns = useMemo(() => {
		if (crudTableContext.tableSortColumns.length === 0) {
			return columns
		}
		columns.forEach((item) => {
			item.key = getTableUniqueKey(item.dataIndex)
			const sortItem = crudTableContext.tableSortColumns.find((v) => v.key === getTableUniqueKey(item.dataIndex))
			if (sortItem) item.hidden = !sortItem.checked
		})
		return columns.sort((a, b) => {
			const aIndex = crudTableContext.tableSortColumns.findIndex((item) => item.key === getTableUniqueKey(a.dataIndex))
			const bIndex = crudTableContext.tableSortColumns.findIndex((item) => item.key === getTableUniqueKey(b.dataIndex))
			return aIndex - bIndex
		})
	}, [crudTableContext.tableSortColumns, columns])

	return (
		<ProTable
			{...getProps()}
			columns={tableColumns}
			size={crudTableContext.tableSize}
			onSizeChange={crudTableContext.setTableSize}
			optionsRender={(props) => {
				return [
					<TableRefresh
						key="refresh"
						onRefresh={() => {
							props.action.current?.reload()
						}}
					/>,
					<TableFullScreen
						key="fullscreen"
						toggle={() => {
							props.action.current?.fullScreen()
						}}
					/>,
					<TableColumsSetting key="columns" />,
					<TableOtherSetting key="other" />,
				]
			}}
		/>
	)
}

const CrudTable = <T extends Record<string, any>, U, ValueType>(props: ProTableProps<T, U, ValueType>) => {
	const { defaultSize, columns, ...rest } = props

	const tableSortColumns: Array<CrudTableSortColum> = columns.map((item) => ({
		checked: true,
		key: getTableUniqueKey(item.dataIndex),
		title: item.title,
	})) as any

	return (
		<CrudTableProvider initialTableSize={defaultSize} initialTableSortColumns={tableSortColumns}>
			<CrudTableBody {...{ ...rest, defaultSize, columns }} />
		</CrudTableProvider>
	)
}

export default CrudTable

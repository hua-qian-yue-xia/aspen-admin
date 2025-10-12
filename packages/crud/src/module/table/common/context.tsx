import { createContext, useContext, useState } from "react"
import type { PropsWithChildren } from "react"

import type { SizeType } from "antd/lib/config-provider/SizeContext"

export type CrudTableContextProps = {
	/**
	 * @name 表格尺寸
	 */
	tableSize: SizeType
	setTableSize: (size: SizeType) => void
	/**
	 * @name 表格边框
	 */
	tableBordered: boolean
	setTableBordered: (bordered: boolean) => void
	/**
	 * @name 表格斑马纹
	 */
	tableZebra: boolean
	setTableZebra: (zebra: boolean) => void
	/**
	 * @name 表格固定表头
	 */
	tableFixedHeader: boolean
	setTableFixedHeader: (fixedHeader: boolean) => void
	/**
	 * @name 表格排序列
	 */
	tableSortColumns: Array<CrudTableSortColum>
	setTableSortColumns: (sortColumns: Array<CrudTableSortColum>) => void
}

export type CrudTableSortColum = {
	checked: boolean
	key: string
	title: string
}

const CrudTableContext = createContext<CrudTableContextProps>({
	tableSize: "small",
	setTableSize: () => {},
	tableBordered: false,
	setTableBordered: () => {},
	tableZebra: false,
	setTableZebra: () => {},
	tableFixedHeader: false,
	setTableFixedHeader: () => {},
	tableSortColumns: [],
	setTableSortColumns: () => {},
})

export const useCrudTableContext = () => {
	const context = useContext(CrudTableContext)
	if (!context) console.error(`当前作用域未注入CrudTableContext`)
	return context
}

type InitialCrudTableProp = {
	initialTableSize?: SizeType
	initialTableBordered?: boolean
	initialTableZebra?: boolean
	initialTableFixedHeader?: boolean
	initialTableSortColumns: Array<CrudTableSortColum>
}

export const CrudTableProvider: React.FC<PropsWithChildren<InitialCrudTableProp>> = ({
	children,
	initialTableSize,
	initialTableBordered,
	initialTableZebra,
	initialTableFixedHeader,
	initialTableSortColumns,
}) => {
	const [tableSize, setTableSize] = useState<SizeType>(initialTableSize ?? "small")
	const [tableBordered, setTableBordered] = useState<boolean>(initialTableBordered ?? true)
	const [tableZebra, setTableZebra] = useState<boolean>(initialTableZebra ?? true)
	const [tableFixedHeader, setTableFixedHeader] = useState<boolean>(initialTableFixedHeader ?? true)
	const [tableSortColumns, setTableSortColumns] = useState<Array<CrudTableSortColum>>(initialTableSortColumns ?? [])

	return (
		<CrudTableContext.Provider
			value={{
				tableSize: tableSize,
				setTableSize,
				tableBordered,
				setTableBordered,
				tableZebra,
				setTableZebra,
				tableFixedHeader,
				setTableFixedHeader,
				tableSortColumns,
				setTableSortColumns,
			}}
		>
			{children}
		</CrudTableContext.Provider>
	)
}

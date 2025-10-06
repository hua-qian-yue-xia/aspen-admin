import type { TableProps } from "antd"
import { ColumnType } from "antd/es/table"

import { LabelTooltipType } from "antd/lib/form/FormItemLabel"

export type ExtraAntdTableColumnType<T> = Omit<
	ColumnType<T>,
	"render" | "children" | "title" | "filters" | "onFilter" | "sorter"
>

export type CrudColumn<Entity = Record<string, any>> = {
	/**
	 * @name 与实体映射的key
	 * @description 支持一个数字，[a,b] 会转化为 obj.a.b
	 */
	dataIndex: string | Array<string>
	/**
	 * @name 标题
	 * @description 支持 ReactNode 和 方法
	 */
	title: React.ReactNode
	/**
	 * @name 展示一个 icon，hover 是展示一些提示信息
	 */
	tooltip?: LabelTooltipType | string
	/**
	 * @name 是否可编辑
	 * @default false
	 */
	editable?: false | CrudColumnEditable<Entity>
	/**
	 * @name 展示模式-自定义dom
	 */
	render?: CrudColumnRender<Entity>
	/**
	 * @name 编辑模式-自定义dom
	 */
	formItemRender?: CrudColumnRender<Entity>
} & ExtraAntdTableColumnType<Entity>

export type CrudColumnEditable<Entity = Record<string, any>> = (entity: Entity, index: number) => boolean

export type CrudColumnRender<Entity = Record<string, any>> = (
	entity: Entity,
	index: number,
	action: CrudColumnTableAction,
) => React.ReactNode

export type CrudColumnFormItemRender<Entity = Record<string, any>> = (entity: Entity, index: number) => React.ReactNode

export type CrudColumnTableAction = {
	/**
	 * @name 刷新table页面
	 * @param resetPageIndex 是否重置页码
	 */
	reload: (resetPageIndex?: boolean) => Promise<void>
	/**
	 * @name 清空table选中项
	 */
	clearSelected?: () => void
}

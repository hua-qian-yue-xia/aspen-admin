import { Checkbox, Flex, Popover } from "antd"

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import type { OnDragEndResponder } from "@hello-pangea/dnd"

import BaseButtonIcon from "../../base/base-button-icon"
import BaseSvgIcon from "../../base/base-svg-icon"

import { useCrudTableContext } from "../common/context"

const TableColumsSetting: React.FC = () => {
	return (
		<Popover
			title={null}
			placement="bottomRight"
			trigger={["click"]}
			content={
				<Flex className="min-w-[150px]">
					<DragContent />
				</Flex>
			}
		>
			<BaseButtonIcon
				color="default"
				variant="filled"
				icon="lucide:list-todo"
				tooltipPlacement="top"
				tooltipContent="列设置"
			/>
		</Popover>
	)
}

const DragContent: React.FC = () => {
	const crudTableContext = useCrudTableContext()

	if (crudTableContext.tableSortColumns.length === 0) {
		return null
	}

	const dragEnd: OnDragEndResponder = (result) => {
		if (!result.destination) return
		const startIndex = result.source.index
		const endIndex = result.destination.index

		const colums = Array.from(crudTableContext.tableSortColumns)
		colums[startIndex] = crudTableContext.tableSortColumns[endIndex]
		colums[endIndex] = crudTableContext.tableSortColumns[startIndex]
		crudTableContext.setTableSortColumns(colums)
	}

	const handleChange = (value: boolean, index: number) => {
		crudTableContext.tableSortColumns[index].checked = !value
		crudTableContext.setTableSortColumns([...crudTableContext.tableSortColumns])
	}

	return (
		<DragDropContext onDragEnd={dragEnd}>
			<Droppable droppableId="sortable-list">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
						{crudTableContext.tableSortColumns.map((v, i) => {
							return (
								<Draggable draggableId={v.key} index={i} key={v.key}>
									{(provider) => (
										<div
											ref={provider.innerRef}
											{...provider.draggableProps}
											{...provider.dragHandleProps}
											className="w-full h-36px px-2 flex-row-center gap-2 rd-4px hover:(bg-primary bg-opacity-20)"
										>
											<BaseSvgIcon icon="mdi:drag" className="h-full cursor-move text-icon" />
											<Checkbox
												checked={v.checked}
												className="none_draggable flex-1"
												onChange={() => handleChange(v.checked, i)}
											>
												{v.title}
											</Checkbox>
										</div>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default memo(TableColumsSetting)

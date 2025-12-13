import { Handle, Position } from "@xyflow/react"
import { Dropdown, Flex, Typography } from "antd"
import type { MenuProps } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import React, { memo, useCallback } from "react"

type Props = {
	data: any
}

const { Text } = Typography

const dropdownItems: MenuProps["items"] = [
	{ key: "ADD", icon: <FormOutlined />, label: "新增" },
	{ key: "EDIT", icon: <FormOutlined />, label: "编辑" },
	{ key: "DELETE", icon: <DeleteOutlined />, label: "删除" },
]

const DeptNode: React.FC<Props> = ({ data }) => {
	const firstStr = data?.label?.slice(0, 1) || ""

	const dropdownClick = useCallback(
		(key: string) => {
			data?.dropdownChange?.(key as any, data)
		},
		[data],
	)

	return (
		<div
			className="rounded-1.5 border border-solid border-primary overflow-hidden"
			style={{
				background: "#fff",
				boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
				minWidth: 172,
			}}
		>
			<Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
			<Dropdown
				menu={{
					items: dropdownItems,
					onClick: ({ key, domEvent }) => {
						domEvent?.stopPropagation()
						dropdownClick(key)
					},
				}}
				trigger={["contextMenu"]}
			>
				<Flex vertical align="center" justify="center">
					<div className="w-full h-2 bg-primary"></div>
					<Flex className="w-full px-3 py-2" align="center">
						<div className="flex-row-center size-10 bg-primary rounded-full">
							<Text className="color-white">{firstStr}</Text>
						</div>
						<Flex className="m-l-2" flex={1} vertical justify="center">
							<Text strong className="color-primary! text-sm">
								{data.label}
							</Text>
							<Text className="opacity-70 text-xs">
								共{0}子部门,共{0}人
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Dropdown>

			<Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
		</div>
	)
}

export default memo(DeptNode)

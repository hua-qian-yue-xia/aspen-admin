import React, { memo } from "react"

import { Flex, Popconfirm, Tooltip } from "antd"
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from "@ant-design/icons"

type Props = {
	/**
	 * 是否显示`删除`按钮
	 * @default false
	 */
	visibleDelete?: boolean
	/**
	 * 是否显示`上移`按钮
	 * @default false
	 */
	visibleUp?: boolean
	/**
	 * 是否显示`下移`按钮
	 * @default false
	 */
	visibleDown?: boolean
}

const FormItemOperation: React.FC<Props> = memo(({ visibleDelete = false, visibleUp = false, visibleDown = false }) => {
	// 点击`删除`
	const doDelete = useCallback(() => {
		console.log(`点击'删除'按钮`)
	}, [])
	// 点击`上移`
	const doUp = useCallback(() => {
		console.log(`点击'上移'按钮`)
	}, [])
	// 点击`下移`
	const doDown = useCallback(() => {
		console.log(`点击'下移'按钮`)
	}, [])
	// 点击`复制`
	// const doCopy = useCallback(() => {
	// 	console.log(`点击'复制'按钮`)
	// }, [])

	return (
		<nav>
			<Flex gap="middle" justify="center">
				{visibleUp && (
					<Tooltip placement="top" title={"上移"}>
						<CaretUpOutlined onClick={() => doUp()} />
					</Tooltip>
				)}
				{visibleDown && (
					<Tooltip placement="top" title={"下移"}>
						<CaretDownOutlined onClick={() => doDown()} />
					</Tooltip>
				)}
				{visibleDelete && (
					<Popconfirm
						placement="bottom"
						title="是否删除当前项"
						okText="删除"
						cancelText="取消"
						onConfirm={() => doDelete()}
					>
						<Tooltip placement="top" title={"删除"}>
							<DeleteOutlined />
						</Tooltip>
					</Popconfirm>
				)}
			</Flex>
		</nav>
	)
})

export default FormItemOperation

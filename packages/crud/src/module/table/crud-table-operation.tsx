import { Button, Divider, Flex } from "antd"

import BaseSvgIcon from "../base/base-svg-icon"

type Props = {
	leftRender?: React.ReactNode
	rightRender?: React.ReactNode
	visibleAdd?: boolean
	visibleImport?: boolean
	onAdd?: () => void
	onImport?: () => void
}

const CrudTableOperation: React.FC<Props> = ({
	leftRender,
	rightRender,
	visibleAdd = true,
	visibleImport = true,
	onAdd,
	onImport,
}) => {
	return (
		<Flex align="center">
			<Flex gap={12} align="center">
				{leftRender}
				{visibleAdd && (
					<Button
						type="primary"
						color="primary"
						size="middle"
						icon={<BaseSvgIcon icon="mingcute:add-fill" />}
						onClick={onAdd}
					>
						新增
					</Button>
				)}
				{visibleImport && (
					<Button
						type="dashed"
						size="middle"
						variant="solid"
						icon={<BaseSvgIcon icon="mingcute:file-import-line" />}
						onClick={onImport}
					>
						导入
					</Button>
				)}
				{rightRender}
			</Flex>
			<Divider type="vertical" size="small" style={{ height: "calc(var(--ant-control-height) * 0.8)" }} />
		</Flex>
	)
}

export default CrudTableOperation

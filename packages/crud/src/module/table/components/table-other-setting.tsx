import { Button, Divider, Flex, Popover, Radio, Switch, Typography } from "antd"

import { ExportOutlined, PrinterOutlined } from "@ant-design/icons"

import BaseButtonIcon from "../../base/base-button-icon"
import BaseSettingItem from "../../base/base-setting-item"

import { TABLE_CONSTANT } from "../common/constant"
import { useCrudTableContext } from "../common/context"

const { Text } = Typography

const MainText = ({ children }) => <Text className="font-size-14px mb-2">{children}</Text>
const SecondText = ({ children }) => (
	<Text className="font-size-14px" type="secondary">
		{children}
	</Text>
)

const TableOtherSetting: React.FC = () => {
	const crudTableContext = useCrudTableContext()
	return (
		<Popover
			title={null}
			placement="bottomRight"
			trigger={["click"]}
			content={
				<Flex className="p-4px" vertical>
					<Flex vertical>
						<MainText>外观</MainText>
						<Flex vertical gap={8}>
							<BaseSettingItem label={<SecondText>边框</SecondText>}>
								<Switch
									size="small"
									defaultChecked
									value={crudTableContext.tableBordered}
									onChange={(v) => crudTableContext.setTableBordered(v)}
								/>
							</BaseSettingItem>
							<BaseSettingItem label={<SecondText>斑马纹</SecondText>}>
								<Switch
									size="small"
									defaultChecked
									value={crudTableContext.tableZebra}
									onChange={(v) => crudTableContext.setTableZebra(v)}
								/>
							</BaseSettingItem>
							<BaseSettingItem label={<SecondText>固定表头</SecondText>}>
								<Switch
									size="small"
									defaultChecked
									value={crudTableContext.tableFixedHeader}
									onChange={(v) => crudTableContext.setTableFixedHeader(v)}
								/>
							</BaseSettingItem>
						</Flex>
						<Divider size="small" />
					</Flex>

					<Flex vertical>
						<MainText>尺寸</MainText>
						<Flex justify="center" align="center">
							<Radio.Group
								size="small"
								value={crudTableContext.tableSize}
								onChange={(e) => crudTableContext.setTableSize(e.target.value)}
							>
								{TABLE_CONSTANT.SIZE.map((item) => (
									<Radio.Button key={item.value} value={item.value}>
										<MainText>{item.label}</MainText>
									</Radio.Button>
								))}
							</Radio.Group>
						</Flex>
						<Divider size="small" />
					</Flex>

					<Flex vertical>
						<MainText>操作</MainText>
						<Flex justify="space-between" gap={8}>
							<Button size="small" shape="round" color="default" variant="filled" icon={<PrinterOutlined />}>
								<SecondText>打印</SecondText>
							</Button>
							<Button size="small" shape="round" color="default" variant="filled" icon={<ExportOutlined />}>
								<SecondText>导出</SecondText>
							</Button>
						</Flex>
					</Flex>
				</Flex>
			}
		>
			<BaseButtonIcon
				color="default"
				variant="filled"
				icon="iconoir:settings"
				tooltipPlacement="top"
				tooltipContent="其他"
			/>
		</Popover>
	)
}

export default TableOtherSetting

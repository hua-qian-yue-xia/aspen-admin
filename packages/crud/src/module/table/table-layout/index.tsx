import React from "react"

import { Popover, Flex, Pagination, Divider, Radio, Button, Typography, Switch } from "antd"
import { ExportOutlined, PrinterOutlined } from "@ant-design/icons"

import BaseButtonIcon from "../../base/base-button-icon"
import BaseSettingItem from "../../base/base-setting-item"

import type { CrudLayoutTableShow, CrudLayoutTableRender } from "./prop"

import CurdTable from "../table/index"
import type { CurdTableProps } from "../table/index"

import { TABLE_CONSTANT } from "../constant"

const { Title, Text } = Typography

export type Props<Entity> = {
	title?: React.ReactNode

	show?: CrudLayoutTableShow

	render?: CrudLayoutTableRender

	table?: CurdTableProps<Entity>
}

function CurdLayoutTable<Entity extends Record<string, any>>(props: Props<Entity>) {
	const { title, show, render } = props

	return (
		<Flex className="w-full h-full p-16px" vertical={false}>
			<Flex vertical>{render?.left}</Flex>
			<Flex className="w-full h-full" vertical={true}>
				{/* start 表格上方操作区域 start */}
				<Flex className="w-full h-36px mb-16px" vertical={false} justify="space-between" align="center">
					<TbaleHeadLeft show={show?.headLeft} title={title} />
					<TbaleHeadRight show={show?.headRight} />
				</Flex>
				{/* end 表格上方操作区域 end */}

				{/* start 表格区域 start */}
				<div className="w-full flex-1 min-h-0 max-h-full overflow-hidden">
					<CurdTable {...props?.table} />
				</div>
				{/* end 表格区域 end */}

				{/* start 表格下方操作区域 start */}
				<Flex className="w-full h-36px pt-6px mt-16px" vertical={false} justify="space-between">
					<div></div>
					<Pagination total={85} />
				</Flex>
				{/* end 表格下方操作区域 end */}
			</Flex>
			<Flex vertical>{render?.right}</Flex>
		</Flex>
	)
}
const MainText = ({ children }) => <Text className="font-size-14px mb-2">{children}</Text>

const SecondText = ({ children }) => (
	<Text className="font-size-14px" type="secondary">
		{children}
	</Text>
)

const TbaleHeadLeft: React.FC<{ show?: CrudLayoutTableShow["headLeft"]; title?: React.ReactNode }> = (props) => {
	const { show = { title: true }, title } = props
	return (
		<Flex className="full" vertical={false} justify="flex-start" align="center">
			{show?.title && (
				<Title className="m-0!" level={5}>
					{title}
				</Title>
			)}
		</Flex>
	)
}

const TbaleHeadRight: React.FC<{ show?: CrudLayoutTableShow["headRight"] }> = (props) => {
	const {
		show = {
			refresh: true,
			fullscreen: true,
			columnSetting: true,
			other: true,
		},
	} = props

	const [size, setSize] = useState(TABLE_CONSTANT.SIZE[0].value)
	const [bordered, setBordered] = useState(true)
	const [zebra, setZebra] = useState(true)

	return (
		<Flex className="full" vertical={false} justify="flex-end" gap={8}>
			{show?.refresh && <BaseButtonIcon icon="iconoir:refresh" tooltipPlacement="top" tooltipContent="刷新" />}
			{show?.fullscreen && <BaseButtonIcon icon="iconoir:refresh" tooltipPlacement="top" tooltipContent="表格全屏" />}
			{show?.columnSetting && (
				<Popover
					title={null}
					placement="bottomRight"
					trigger={["click"]}
					content={() => {
						return <div>sdfasfas</div>
					}}
				>
					<BaseButtonIcon icon="iconoir:refresh" tooltipPlacement="top" tooltipContent="列设置" />
				</Popover>
			)}
			{show?.other && (
				<Popover
					title={null}
					placement="bottomRight"
					trigger={["click"]}
					content={() => {
						return (
							<Flex className="p-4px" vertical>
								<Flex vertical>
									<MainText>外观</MainText>
									<Flex vertical gap={8}>
										<BaseSettingItem label={<SecondText>边框</SecondText>}>
											<Switch size="small" defaultChecked value={bordered} onChange={setBordered} />
										</BaseSettingItem>
										<BaseSettingItem label={<SecondText>斑马纹</SecondText>}>
											<Switch size="small" defaultChecked value={zebra} onChange={setZebra} />
										</BaseSettingItem>
									</Flex>
									<Divider size="small" />
								</Flex>

								<Flex vertical>
									<MainText>尺寸</MainText>
									<Flex justify="center" align="center">
										<Radio.Group size="small" value={size} onChange={(e) => setSize(e.target.value)}>
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
						)
					}}
				>
					<BaseButtonIcon icon="icon-park-outline:config" tooltipPlacement="top" tooltipContent="其他功能" />
				</Popover>
			)}
		</Flex>
	)
}

export default CurdLayoutTable

import React, { CSSProperties } from "react"

import { Typography, Flex, Input, Popover, Segmented, Space } from "antd"
import { useBoolean } from "ahooks"

import { mergeClass } from "@aspen/common"

import CMP from "@@/components"

import { getLocalIcons } from "./tool/icon-share"
import { ProCard } from "@ant-design/pro-components"
import { HolderOutlined } from "@ant-design/icons"

type Props = {
	readonly className?: string
	readonly style?: CSSProperties
	value?: string
	onChange?: (value: string) => void
	/**
	 * 输入框占位符
	 * @default "请选择图标"
	 */
	placeholder?: string
}

type IconRenderProps = {
	value?: string
	onChange?: (value: string) => void
}

const localIcons = getLocalIcons()

const { Text } = Typography

const iconType = [
	{ label: "本地图标", value: "local" },
	{ label: "Ant Design 图标", value: "antd" },
	{ label: "网络图标", value: "network" },
]

const localIconRender: React.FC<IconRenderProps> = ({ value, onChange }) => {
	return (
		<ProCard wrap gutter={[12, 12]} bodyStyle={{ padding: 0 }} className="full">
			{localIcons.map((item) => (
				<ProCard
					checked={value === item}
					onChecked={() => onChange?.(item)}
					key={item}
					colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
					layout="center"
					bordered
					hoverable
					bodyStyle={{
						padding: "0.5em 0",
					}}
					split="horizontal"
					className="h-full"
				>
					<CMP.icon.svg localIcon={item} className="size-10" />
					<Text className="opacity-70 text-sm">{item}</Text>
				</ProCard>
			))}
		</ProCard>
	)
}

const SelectIcon: React.FC<Props> = (props) => {
	const { value = "", onChange, placeholder = "请选择图标", className, style } = props

	const [popoverOpen, popoverOpenAction] = useBoolean(false)

	const handleClick = useCallback(
		(e: string) => {
			onChange?.(e)
			popoverOpenAction.setFalse()
		},
		[onChange],
	)

	return (
		<Popover
			title="选择图标"
			placement="bottomLeft"
			arrow={true}
			trigger="click"
			onOpenChange={(visible) => popoverOpenAction.set(visible)}
			open={popoverOpen}
			content={
				<Flex vertical style={style} className={mergeClass(className, "min-w-180")}>
					<Segmented block options={iconType} />
					{localIconRender({ value, onChange: handleClick })}
				</Flex>
			}
		>
			<div style={style} className={mergeClass(className, "w-full")}>
				<Space.Compact block>
					<Input
						type="text"
						allowClear
						placeholder={placeholder}
						value={value}
						prefix={value ? <CMP.icon.svg localIcon={value} className="text-xl" /> : undefined}
						onClear={() => {
							onChange?.("")
						}}
					/>
					<Space.Addon className="cursor-pointer" onClick={() => popoverOpenAction.setTrue()}>
						<HolderOutlined />
					</Space.Addon>
				</Space.Compact>
			</div>
		</Popover>
	)
}

export default memo(SelectIcon)

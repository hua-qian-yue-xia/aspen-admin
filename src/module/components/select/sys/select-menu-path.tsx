import BaseSelect from "../base-select"
import type { SelectProps } from "antd"

import tool from "@@/tool"

type Props = Pick<SelectProps, "value" | "onChange">

const SelectMenuPath: React.FC<Props> = (props) => {
	console.log("value:", props.value)
	return (
		<BaseSelect
			{...props}
			placeholder="请选择菜单路径"
			getOptions={async () => {
				const menuPath = tool.storage.genStorage.get("MENU-PATH")
				if (!menuPath) return null
				return menuPath.map((v) => {
					return {
						label: v,
						value: v,
					}
				})
			}}
		/>
	)
}

export default SelectMenuPath

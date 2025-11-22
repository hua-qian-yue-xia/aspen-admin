import BaseSelect from "../base-select"
import type { SelectProps } from "antd"

import tool from "@@/tool"

type Props = Pick<SelectProps, "value" | "onChange">

/**
 * 选择菜单
 * @description 会选择/view/{**}/index.tsx下的所有菜单路径
 */
const SelectMenuPath: React.FC<Props> = (props) => {
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

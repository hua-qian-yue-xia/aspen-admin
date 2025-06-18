import { Tabs } from "antd"

import type { FormNavItem } from "../../shared/form-props"

type Props = {
	className?: string
	/**
	 * 导航列表
	 */
	list: Array<FormNavItem>
}

const FormNav: React.FC<Props> = ({ className, list }) => {
	if (!list.length) return null
	return (
		<div className={className}>
			<Tabs
				tabPosition="left"
				style={{ height: "100%" }}
				items={list.map((v) => {
					return {
						label: v.title,
						key: v.key,
					}
				})}
			/>
		</div>
	)
}

export default FormNav

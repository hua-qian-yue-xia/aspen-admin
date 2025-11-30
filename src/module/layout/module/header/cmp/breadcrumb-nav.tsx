import React, { cloneElement } from "react"

import { Breadcrumb } from "antd"
import type { BreadcrumbProps } from "antd"

import TOOL from "@@/tool"
import { useRouter } from "@@/router/router-context"

import { useMenuContext } from "../../../context/menu-context"

function BreadcrumbContent({ icon, label }: { readonly icon: JSX.Element; readonly label: React.ReactNode }) {
	return (
		<div className="inline-flex items-center align-middle cursor-pointer">
			{cloneElement(icon, { className: "mr-4px text-icon", ...icon.props })}
			{label}
		</div>
	)
}

const BreadcrumbCmp: React.FC<Omit<BreadcrumbProps, "items">> = (props) => {
	const { menuList, currentRoute } = useMenuContext()
	const { navigate } = useRouter()

	const breadcrumb = useMemo(() => {
		return TOOL.tree.findPath(menuList, (node) => node.key === currentRoute.pathname) ?? []
	}, [menuList, currentRoute])

	const handleClickMenu = useCallback(
		(menuInfo: any) => {
			navigate(menuInfo.key)
		},
		[navigate],
	)

	const items: BreadcrumbProps["items"] = breadcrumb.map((item, index) => {
		const commonTitle = <BreadcrumbContent icon={item.icon} key={item.key} label={item.label} />
		return {
			title: commonTitle,
			...("children" in item &&
				item.children && {
					menu: {
						items: item.children.filter(Boolean),
						onClick: handleClickMenu,
						selectedKeys: [breadcrumb[index + 1]?.key] as string[],
					},
				}),
		}
	})

	return <Breadcrumb {...props} items={items} />
}

export default memo(BreadcrumbCmp)

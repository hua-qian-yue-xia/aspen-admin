import React from "react"

import { Breadcrumb } from "antd"

type Props = {
	className?: string
}

// const BreadcrumbItem: React.FC<{ PrefixIcon: React.ReactNode }> = ({ PrefixIcon }) => {
// 	return <div className="flex-row items-center">{PrefixIcon}</div>
// }

const BreadcrumbNav: React.FC<Props> = ({ className }) => {
	return <Breadcrumb className={className} items={[]} />
}

export default BreadcrumbNav

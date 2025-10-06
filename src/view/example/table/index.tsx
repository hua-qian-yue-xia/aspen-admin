import React from "react"

import { CurdLayoutTable } from "@aspen/crud"
import type { CrudColumn } from "@aspen/crud"

import { SysUserEntity } from "@/module/api/gen/gen-api"

const columns: Array<CrudColumn<SysUserEntity>> = [
	{
		title: "用户名",
		dataIndex: "test",
	},
	{
		title: "密码",
		dataIndex: "test",
	},
	{
		title: "邮箱",
		dataIndex: "test",
	},
	{
		title: "手机号",
		dataIndex: "test",
	},
	{
		title: "操作",
		dataIndex: "test",
	},
]

const RouterExamplePage: React.FC = () => {
	return (
		<div className="full">
			<CurdLayoutTable title="表格" table={{ columns: columns }} />
		</div>
	)
}

export default RouterExamplePage

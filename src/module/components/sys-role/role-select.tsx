import React from "react"

import { useSetState } from "ahooks"

import { API } from "@@/api/share/request-tool"
import type { SysRoleEntity, SysRoleQueryDto } from "@/module/api/gen/gen-api"

import BaseSelect from "../select/base-select"
import type { BaseSelectProps, BaseSelectOption } from "../select/base-select"

const RoleSelectCmp: React.FC<BaseSelectProps> = (props) => {
	const { placeholder = "请选择角色", ...rest } = props

	const [searchParams] = useSetState<SysRoleQueryDto>({} as any)

	// 查询角色分页
	const getRolePage = async () => {
		try {
			const { data } = await API.sys.sysRoleControllerScopePage(searchParams)
			if (!data.records) return []
			return data.records?.map<BaseSelectOption<SysRoleEntity>>((item) => ({
				label: item.roleName,
				value: item.roleId,
				extra: item,
			}))
		} catch (error) {
			console.error("|查询角色分页|意外的错误,error:", error)
		}
	}

	return <BaseSelect getOptions={getRolePage} placeholder={placeholder} {...rest} />
}

export default RoleSelectCmp

import ButtonIcon from "./icon/button-icon"
import SelectIcon from "./icon/select-icon"
import SvgIcon from "./icon/svg-icon"

import DictSelect from "./dict/dict-select"
import DictTag from "./dict/dict-tag"

import DeptForm from "./sys-dept/dept-form"
import DeptTree from "./sys-dept/dept-tree"
import DeptTreeSelect from "./sys-dept/dept-tree-select"

import MenuForm from "./sys-menu/menu-form"
import MenuTree from "./sys-menu/menu-tree"
import MenuTreeSelect from "./sys-menu/menu-tree-select"

import RoleForm from "./sys-role/role-form"
import RoleList from "./sys-role/role-list"
import RoleSelect from "./sys-role/role-select"

export default {
	icon: {
		button: ButtonIcon,
		select: SelectIcon,
		svg: SvgIcon,
	},
	dict: {
		select: DictSelect,
		tag: DictTag,
	},
	sysRole: {
		RoleForm,
		RoleList,
		RoleSelect,
	},
	sysDept: {
		DeptForm,
		DeptTree,
		DeptTreeSelect,
	},
	sysMenu: {
		MenuForm,
		MenuTree,
		MenuTreeSelect,
	},
}

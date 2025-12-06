import ButtonIcon from "./icon/button-icon"
import SelectIcon from "./icon/select-icon"
import SvgIcon from "./icon/svg-icon"

import DictSelect from "./dict/dict-select"
import DictTag from "./dict/dict-tag"

import RoleList from "./sys-role/role-list"
import RoleSelect from "./sys-role/role-select"

import DeptTreeSelectCmp from "./tree/dept/dept-tree-select"
import DeptTreeCmp from "./tree/dept/dept-tree"

import MenuTreeCmp from "./tree/menu/menu-tree"
import MenuTreeSelectCmp from "./tree/menu/menu-tree-select"

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
		RoleList,
		RoleSelect,
	},
	tree: {
		dept: DeptTreeCmp,
		deptSelect: DeptTreeSelectCmp,
		menu: MenuTreeCmp,
		menuSelect: MenuTreeSelectCmp,
	},
}

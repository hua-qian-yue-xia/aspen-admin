import DictSelect from "./dict/dict-select"
import DictTag from "./dict/dict-tag"

import DeptTreeSelectCmp from "./tree/dept/dept-tree-select"
import DeptTreeCmp from "./tree/dept/dept-tree"

import RoleTreeCmp from "./tree/role/role-tree"
import RoleTreeSelectCmp from "./tree/role/role-tree-select"

import MenuTreeCmp from "./tree/menu/menu-tree"
import MenuTreeSelectCmp from "./tree/menu/menu-tree-select"

export default {
	dict: {
		select: DictSelect,
		tag: DictTag,
	},
	tree: {
		dept: DeptTreeCmp,
		deptSelect: DeptTreeSelectCmp,
		role: RoleTreeCmp,
		roleSelect: RoleTreeSelectCmp,
		menu: MenuTreeCmp,
		menuSelect: MenuTreeSelectCmp,
	},
}

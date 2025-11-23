import DictSelect from "./dict/dict-select"
import DictTag from "./dict/dict-tag"

import DeptTreeSelectCmp from "./tree/dept/dept-tree-select"
import DeptTreeCmp from "./tree/dept/dept-tree"

export default {
	dict: {
		select: DictSelect,
		tag: DictTag,
	},
	tree: {
		dept: DeptTreeCmp,
		deptSelect: DeptTreeSelectCmp,
	},
}

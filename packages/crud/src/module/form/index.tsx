import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"
import { Form, FormItem, Input, Password } from "@formily/antd-v5"

import FormNav from "./components/form/form-nav"

import type { FormProps } from "./shared/formily-transition"
import { getFormilySchema } from "./shared/formily-transition"

import "./index.scss"

const normalForm = createForm({
	validateFirst: true,
})

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Input,
		Password,
	},
})

const CurdForm: React.FC<FormProps> = memo((props) => {
	const schema = getFormilySchema(props)
	return (
		<div className="form">
			<FormNav />
			<Form form={normalForm}>
				<SchemaField schema={schema} />
			</Form>
		</div>
	)
})

export default CurdForm

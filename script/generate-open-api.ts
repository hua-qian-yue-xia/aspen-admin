import { generateApi } from "swagger-typescript-api"

export const generateOpenApi = async (input: string, output: string) => {
	await generateApi({
		url: input,
		output: output,
		modular: false,
		cleanOutput: true,
		httpClientType: "axios",
		fileName: "gen-api",
		addReadonly: true,
		// 解包响应数据，返回 response.data 而不是完整的 AxiosResponse
		unwrapResponseData: true,
		hooks: {
			onParseSchema: (originalSchema, parsedSchema) => {
				// 对于对象类型，添加索引签名使其兼容 Record<string, any>
				if (parsedSchema && typeof parsedSchema === "object" && "content" in parsedSchema) {
					const schema = parsedSchema as any
					if (Array.isArray(schema.content)) {
						// 添加索引签名到对象类型
						schema.content.push({
							$$raw: {
								type: "any",
								required: false,
								$parsed: {
									$parsedSchema: true,
									schemaType: "primitive",
									type: "any",
									typeIdentifier: "any",
									description: "",
									content: "[key: string]: any;",
								},
							},
							isRequired: false,
							field: "[key: string]: any",
						})
					}
				}
				//
				return parsedSchema
			},
		},
	})
}

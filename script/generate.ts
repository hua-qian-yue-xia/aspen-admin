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
	})
}

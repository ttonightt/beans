import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { UserConfig } from "vite/dist/node"
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "beans",
			formats: [ "es", "cjs", "umd" ],
			fileName: "index"
		}
	},

	plugins: [
		dts({
			insertTypesEntry: true
		})
	]
} satisfies UserConfig;
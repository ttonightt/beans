import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { UserConfig } from "vite/dist/node"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "Beans.js",
			formats: [ "es", "cjs", "umd" ]
		}
	}
} satisfies UserConfig;
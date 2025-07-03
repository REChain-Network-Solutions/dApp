import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'odapp',
			fileName: 'odapp',
			formats: ['es', "cjs"],
		},
		minify: false,
	},
	plugins: [dts()]
})
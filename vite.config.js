import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { baseCfg, pluginCfg } from "./vite-config";
// https://vitejs.dev/config/
export default async ({ mode }) => {
	const { VITE_BASE_URL } = loadEnv(mode, process.cwd());
	return defineConfig({
		...baseCfg({ VITE_BASE_URL }),
		plugins: [react(), ...(await pluginCfg({ VITE_BASE_URL }))],
	});
};

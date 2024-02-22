import { resolve, join } from "path";
import fs from "fs";
import JSZip from "jszip";

const readDir = (zip, dirPath) => {
	const files = fs.readdirSync(dirPath);
	files.forEach((item) => {
		const filePath = join(dirPath, "./", item);
		const file = fs.statSync(filePath);
		if (file.isDirectory()) {
			const dirZip = zip.folder(item);
			readDir(dirZip, filePath);
		} else {
			zip.file(item, fs.readFileSync(filePath));
		}
	});
};

const mkZip = async (root, viteEnv, option) => {
	let { fileName = "dist", output = "" } = viteEnv;
	if (!output) {
		output = resolve(root, "./dist");
	}
	fileName += ".zip";
	const distPath = resolve(output);
	const zip = new JSZip();
	readDir(zip, distPath);
	zip.generateAsync(option).then((res) => {
		const dist = join(distPath, `../${fileName}`);
		fs.writeFileSync(dist, res);
	});
};

let viteConfig = null;

const vitePluginZip = (viteEnv = {}) => {
	const option = {
		type: "nodebuffer", // 压缩类型
		compression: "DEFLATE", // 压缩算法
		compressionOptions: {
			level: 9, // 压缩等级
		},
	};
	return {
		name: "vite-plugin-zip",
		apply: "build",
		configResolved(resolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async closeBundle() {
			const root = viteConfig.root;
			await mkZip(root, viteEnv, option);
		},
	};
};
export { vitePluginZip };

import { resolve, basename } from "path";
import fs from "fs";

const isDir = (dir) => {
	try {
		return fs.statSync(dir).isDirectory();
	} catch (_) {
		return false;
	}
};

const isFile = (dir) => {
	try {
		return fs.statSync(dir).isFile();
	} catch (_) {
		return false;
	}
};

const copyFile = (filePath, dist, file) => {
	const readStream = fs.createReadStream(filePath);
	const writeStrem = fs.createWriteStream(resolve(dist, file));
	readStream.pipe(writeStrem);
};

const copyFun = (from, dist, fileName) => {
	if (!isDir(from) && !isFile(from)) return;
	if (!isDir(dist)) {
		fs.mkdirSync(dist);
	}

	if (isDir(from)) {
		const dir = fs.readdirSync(from);
		dir.forEach((file) => {
			const filePath = resolve(from, file);
			fs.stat(filePath, (_, stat) => {
				if (stat.isFile()) {
					copyFile(filePath, dist, file);
				} else if (stat.isDirectory()) {
					copyFun(filePath, resolve(dist, file));
				}
			});
		});
	}

	if (isFile(from)) {
		const file = fileName || basename(from);
		copyFile(from, dist, file);
	}
};

const isObject = (obj) => {
	return ["[object Object]"].includes(Object.prototype.toString.call(obj));
};

const isArray = (obj) => {
	return typeof Array.isArray === "function"
		? Array.isArray(obj)
		: ["[object Array]"].includes(Object.prototype.toString.call(obj));
};

const handleFile = (root, option) => {
	const { from = "", to = "", fileName } = option;
	if (!from || !to) return;
	try {
		const fromDir = resolve(root, from);
		const toDir = resolve(root, to);
		copyFun(fromDir, toDir, fileName);
	} catch (e) {}
};

let viteConfig = null;

const vitePluginCopy = (viteEnv = {}) => {
	const modeIndex = process.argv.indexOf("--mode");
	const mode = modeIndex !== -1 ? process.argv[modeIndex + 1] : "";
	const option = [
		{
			from: `vite-env/.env${mode ? `.${mode}` : ""}`, // 写要复制的目录或者文件
			to: "dist", // 目标目录
			fileName: "", // 复制文件时重命名文件名
		},
	];
	return {
		name: "vite-plugin-copy",
		apply: "build",
		configResolved(resolvedConfig) {
			viteConfig = resolvedConfig;
		},
		closeBundle: async () => {
			const root = viteConfig.root;
			if (isObject(option)) {
				await handleFile(root, option);
			}

			if (isArray(option)) {
				option.forEach(async (item) => {
					await handleFile(root, item);
				});
			}
		},
	};
};

export { vitePluginCopy };

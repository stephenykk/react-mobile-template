import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const DEFAULT_LANG = 'zh';

const importFn = (data) => {
	let lang = {};

	for (const [key, value] of Object.entries(data)) {
		const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
		const name = moduleName.split('/')[1];
		name && (lang[name] = value);
	}
	return lang;
};

let locales = {
	en: {
		translation: importFn(
			import.meta.glob('./US-EN/*.json', {
				import: 'default',
				eager: true,
			})
		),
	},
	zh: {
		translation: importFn(
			import.meta.glob('./ZH-CN/*.json', {
				import: 'default',
				eager: true,
			})
		),
	},
};

i18n.use(initReactI18next).init({
	resources: locales,
	fallbackLng: DEFAULT_LANG, // 选择默认语言，选择内容为上述配置中的 key，即 en/zh
	debug: false,
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
});

export default i18n;

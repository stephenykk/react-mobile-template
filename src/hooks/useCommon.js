import i18n from '@/locales/index'; // 导入国际化
const { getGoodsNum, getLanguage } = $globalServicer('common')
const initFn = async () => {
    const [lang] = await getLanguage()
    if (lang?.code === 20000) {
        Object.keys(lang?.data).forEach((key) => {
            i18n.addResourceBundle(key, 'translation', lang?.data[key], true, true)
        });
    }
    const [res] = await getGoodsNum()
    if (res?.code === 20000) {
        $globalRedux.dispatch({
            type: 'SET_SHOP_NUM',
            shopNum: res?.data || 0,
        })
    }

}

export {
    initFn
}
import React, { useState, useEffect } from 'react'
import HeaderNav from "@/components/header-nav"
import FooterNav from "@/components/footer-nav"
import { SideBar } from 'antd-mobile'
import RefreshScroll from "@/components/refresh-scroll"
import ItemCrad from "../components/itemCrad"
import styles from "./index.module.less"

const { getClassify, getClassifyGoods } = $globalServicer('Classify')

const Classify = () => {

    const [isReadLoad, setReadLoad] = useState(true) // 页面是否处于重新加载
    const [hasMore, setHasMore] = useState(true)
    const [activeKey, setActiveKey] = useState('1')
    const [classifyList, setClassifyList] = useState([])
    const [dataList, setDatalist] = useState([])

    // 获取分类
    const getClassifyList = async () => {

        const [res] = await getClassify();
        if (res?.code === 20000) {
            setClassifyList(res?.data);
            return res.data
        } else {
            return ""
        }
    }

    // 获取分类商品
    const getGoods = async (loadMore) => {
        const [res] = await getClassifyGoods().finally(() => {
            setReadLoad(false)
        })
        const { code, data = [] } = res
        if (code === 20000 && data) {
            const resList = loadMore ? dataList.concat(data) : data
            setDatalist(resList)
            setHasMore(!(dataList.length >= 50))
        }
    }

    // 下拉刷新
    const getRefresh = async () => {
        await getGoods()
    }

    // 上拉加载
    const getLoad = async () => {
        await getGoods(true)
    }

    // 点击分类
    const changeClass = async (key) => {
        await getGoods()
        setActiveKey(key)
    }

    useEffect(() => {
        const initFn = async () => {
            getClassifyList()
            await getGoods()
        }
        initFn()
    }, [])

    return (
        <div className="warp">
            <div className="header">
                <HeaderNav title="分类" backArrow={false}></HeaderNav>
            </div>
            <div className="content">
                <div className={styles.content_warp}>
                    <div className={styles.content_left}>
                        {classifyList.length ? <SideBar style={{ '--background-color': '#ffffff' }} activeKey={activeKey} onChange={changeClass}>
                            {classifyList.map((item) => (
                                <SideBar.Item key={item.id} title={item.classifyName} />
                            ))}
                        </SideBar> : ''}
                    </div>
                    <div className={styles.content_right}>
                        <RefreshScroll onRefresh={getRefresh} loadMore={getLoad} hasMore={hasMore} isReadLoad={isReadLoad}>
                            <div className={styles.item_list}>
                                {dataList.map((item, index) => (
                                    <ItemCrad img={item.img} name={item.name} price={item.price} key={`item_${index}`}></ItemCrad>
                                ))}
                            </div>
                        </RefreshScroll>
                    </div>
                </div>
            </div>
            <div className="footer">
                <FooterNav></FooterNav>
            </div>
        </div>
    );
};

export default Classify;

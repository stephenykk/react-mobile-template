import { useState, useEffect } from 'react'
import HeaderNav from "@/components/header-nav"
import RefreshScroll from "@/components/refresh-scroll"
import FooterNav from "@/components/footer-nav"
import WcSwiper from "@/components/wc-swiper"
import ItemCrad from "../components/itemCrad"
import { Card } from 'antd-mobile'
import { connect } from "react-redux"
import styles from "./index.module.less"

const { getCarousel, getBoutiqueList, getRecommendList } = $globalServicer('home')
const { setShopNum } = $globalReduxAction('common')
const Home = () => {
    const [isReadLoad, setReadLoad] = useState(true) // 页面是否处于重新加载
    const [isLoadding, setLoadding] = useState(false)
    const [carouselList, setCarouselList] = useState([])
    const [boutiqueList, setBoutique] = useState([])
    const [dataList, setDatalist] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setReadLoad(true)
        setLoadding(false)
        getCarouselList()
        getBoutique()
        getRecommendGoods()
    }, [])

    // 下拉刷新
    const getRefresh = async () => {

        Promise.all([getCarouselList(), getBoutique(), getRecommendGoods()]).then(() => {
        });
    }

    // 上拉加载
    const getLoad = async () => {
        await getRecommendGoods(true)
    }

    // 获取轮播图
    const getCarouselList = async () => {
        const [res] = await getCarousel()
        if (res?.code === 20000) {
            setCarouselList(res?.data)
        }
    }

    // 获取精品
    const getBoutique = async () => {
        const [res] = await getBoutiqueList()
        if (res?.code === 20000) {
            setBoutique(res?.data)
        }
    }

    // 获取推荐
    const getRecommendGoods = async (loadMore) => {
        if (isLoadding) return
        const [res] = await getRecommendList().finally(() => {
            setReadLoad(false)
        })
        const { code, data = [] } = res
        if (code === 20000 && data) {
            const resList = loadMore ? dataList.concat(data) : data
            setDatalist(resList)
            setHasMore(!(dataList.length >= 50))
        }
        setLoadding(false)
    }


    return (
        <div className="warp">
            <div className="header">
                <HeaderNav title="首页" backArrow={false}></HeaderNav>
            </div>
            <div className="content">
                <RefreshScroll onRefresh={getRefresh} loadMore={getLoad} hasMore={hasMore} isReadLoad={isReadLoad}>
                    {carouselList.length ? <WcSwiper itemList={carouselList}></WcSwiper> : ''}
                    <Card title='精品' className={styles.crad_body}>
                        <div className={styles.bout_content}>
                            {boutiqueList.map((item, index) => (
                                <ItemCrad img={item.img} name={item.name} price={item.price} key={`bout_${index}`}></ItemCrad>
                            ))}
                        </div>
                    </Card>
                    <Card title='推荐' className={styles.crad_body} >
                        <div className={styles.recommend_body}>
                            {dataList.map((item, index) => (
                                <ItemCrad img={item.img}  name={item.name} price={item.price} key={`item_${index}`}></ItemCrad>
                            ))}
                        </div>

                    </Card>

                </RefreshScroll>
            </div>
            <div className="footer">
                <FooterNav></FooterNav>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => state.common;
const mapDispatchToProps = { setShopNum };
export default connect(mapStateToProps, mapDispatchToProps)(Home);

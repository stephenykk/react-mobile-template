import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import HeaderNav from "@/components/header-nav"
import FooterNav from "@/components/footer-nav"
import RefreshScroll from "@/components/refresh-scroll"
import { ErrorBlock } from 'antd-mobile'
import ItemShop from "../components/itemShop"
import TotalBtn from "../components/totalBtn"
import styles from "./index.module.less"

const { getCard, delCard, changeGoods } = $globalServicer('ShopCard')
const { setShopNum } = $globalReduxAction('common')


const Shop = () => {

    const [isReload, setReload] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const [allchecked, setAllchecked] = useState(false)
    const [allDisabled, setAllDisabled] = useState(false)
    const [dataList, setDatalist] = useState([])

    const getList = async () => {
        const [res] = await getCard().finally(() => {
            setReload(false)
        })
        if (res?.code === 20000) {
            setDatalist(res?.data)
        }
        const isDisabled = (res?.data.length === 0)
        setAllDisabled(isDisabled)
    }

    // 下拉刷新
    const getRefresh = async () => {
        await getList()
    }

    //计算购物车数量
    const calculationNum = (list) => {
        let num = 0;
        list.forEach((item) => {
            num += parseInt(item?.num);
        });
        setShopNum(num);
    };

    //计算价格
    const calculation = (list) => {
        let res = 0;
        list.forEach((item) => {
            if (item?.checked) {
                res += parseFloat(item?.num * parseFloat(item?.price));
            }
        });
        calculationNum(list);
        return isNaN(res) ? 0 : res.toFixed(2);
    };

    //计算与总计
    const handlerFc = (res) => {
        const total = parseFloat(calculation(res));
        setTotalPrice(total)
    };

    //全选择
    const allCheckbox = (val) => {
        const res = dataList.map((item) => {
            return {
                ...item,
                checked: val,
            };
        })
        setDatalist(res)
        const total = parseFloat(calculation(res))
        setTotalPrice(total)
        setAllchecked(val)
    };

    //单个选
    const oneCheckbox = (item) => {
        const res = dataList.map((it) => {
            return {
                ...it,
                checked: (it?.id === item?.id) ? !it?.checked : it?.checked,
            };
        })
        const isAllCheck = res.every((item) => {
            return item.checked;
        });
        setDatalist(res)
        const total = parseFloat(calculation(res));
        setTotalPrice(total)
        setAllchecked(isAllCheck)
    };

    //加、减
    const plusMinus = async (item, val) => {
        let [res] = await changeGoods({ id: item.id });
        if (res.code === 20000) {
            const res = dataList.map((it) => {
                return {
                    ...it,
                    num: (it?.id === item?.id) ? val : it.num
                };
            })
            setDatalist(res)
            handlerFc(res);
        } else {
            item.num -= 1;
        }

    };



    //删除商品
    const delGoods = async (item) => {
        const [res] = await delCard({ id: item?.id });
        if (res.code === 20000) {
            const resList = dataList.filter((it) => {
                return it.id != item?.id;
            });
            setDatalist(resList)
            handlerFc(resList);
            const isAllCheck = resList.length
                ? resList.every((item) => {
                    return item?.checked;
                })
                : false;
            const isDisabled = (resList.length === 0)
            setAllchecked(isAllCheck)
            setAllDisabled(isDisabled)
        }
    };

    useEffect(() => {
        
        setReload(true)
        getList()
    }, [])

    return (
        <div className="warp">
            <div className="header">
                <HeaderNav title="购物车" backArrow={false}></HeaderNav>
            </div>
            <div className="content">
                <div className={styles.shop_list}>
                    <RefreshScroll onRefresh={getRefresh} isReadLoad={true}>
                        {
                            (dataList.length) ? dataList.map((item, index) => {
                                return (<ItemShop img={item.img}
                                    delGoods={delGoods}
                                    oneCheckbox={oneCheckbox}
                                    plusMinus={plusMinus}
                                    item={item}
                                    key={index} />)
                            }) : (!isReload ? <ErrorBlock status='empty' /> : '')
                        }
                    </RefreshScroll>
                </div>

            </div>
            <div className="footer">
                <TotalBtn allchecked={allchecked} allDisabled={allDisabled} allCheckbox={allCheckbox} totalPrice={totalPrice}></TotalBtn>
                <FooterNav></FooterNav>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => state.common;
const mapDispatchToProps = { setShopNum };
export default connect(mapStateToProps, mapDispatchToProps)(Shop);

import { Checkbox, SwipeAction, Ellipsis, Image, Stepper } from 'antd-mobile'
import styles from "./index.module.less"

const ItemShop = (props) => {
    const { item = {}, oneCheckbox, delGoods, plusMinus } = props
    const { name = '', img = '', desc = '', price = '', num = 0, checked = false, } = item

    return (
        <div className={styles.shop_item}>
            <SwipeAction
                className={styles.shop_item__swipe}
                rightActions={[
                    {
                        key: 'delete',
                        text: '删除',
                        color: 'danger',
                        onClick: () => {
                            delGoods(item)
                        }
                    },
                ]}
            >
                <div className={styles.shop_item__content}>
                    <div className={styles.item_left}> <Checkbox checked={checked} onChange={() => { oneCheckbox(item) }}></Checkbox></div>
                    <div className={styles.item_rigth}>
                        <div className={styles.item_rigth__info}>
                            <div className={styles.img}>
                                <Image src={img} width={80} height={80} fit='fill' />
                            </div>
                            <div className={styles.item_rigth__info__textBox}>
                                <div className={styles.name}><Ellipsis direction='end' content={name} /></div>
                                <div className={styles.mome}><Ellipsis direction='end' content={desc} /></div>
                                <div className={styles.price}>¥ {price}</div>
                            </div>
                        </div>
                        <div className={styles.item_rigth__stp}>
                            <Stepper min={1} max={999} digits={0} defaultValue={Number(num)} onChange={(val) => {
                                plusMinus(item, val)
                            }} />
                        </div>
                    </div>
                </div>
            </SwipeAction>
        </div>
    );
};

export default ItemShop;

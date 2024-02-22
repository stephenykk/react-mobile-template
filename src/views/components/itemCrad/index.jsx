import { Image, Ellipsis } from 'antd-mobile'
import styles from "./index.module.less"
const ItemCrad = (props) => {

    const customNavigate = $globalNavigate()

    return (
        <div className={styles.item_warp} onClick={() => {
            customNavigate('/detail')
        }}>
            <div className={styles.img}>
                <Image src={props.img} width={100} height={100} fit='fill' />
            </div>
            <div className={styles.name}><Ellipsis direction='end' content={props.name} /></div>
            <div className={styles.price}><Ellipsis direction='end' content={String(props.price)} /></div>
        </div>
    );
};

export default ItemCrad;

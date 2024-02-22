import HeaderNav from "@/components/header-nav"
import FooterNav from "@/components/footer-nav"
import { Grid, Image } from 'antd-mobile'
import { BillOutline, BankcardOutline, FillinOutline, FileOutline } from 'antd-mobile-icons'
import styles from "./index.module.less"

const My = () => {

    return (
        <div className="warp">
            <div className="header">
                <HeaderNav title="我的" backArrow={false}></HeaderNav>
            </div>
            <div className="content">
                <div className={styles.user_info}>
                    <div className="img">
                        <Image src='https://img.yzcdn.cn/vant/cat.jpeg' width={64}
                            height={64}
                            fit='cover'
                            style={{ borderRadius: 32 }} />
                    </div>
                </div>
                <div className={styles.item_body}>
                    <Grid columns={4} gap={8}>
                        <Grid.Item>
                            <div className={styles.item_content}>
                                <BillOutline fontSize={32} />
                                <div>待付款</div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.item_content}>
                                <BankcardOutline fontSize={32} />
                                <div>待发货</div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.item_content}>
                                <FillinOutline fontSize={32} />
                                <div>待收货</div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.item_content}>
                                <FileOutline fontSize={32} />
                                <div>待评价</div>
                            </div>
                        </Grid.Item>
                    </Grid>
                </div>
            </div>
            <div className="footer">
                <FooterNav></FooterNav>
            </div>
        </div>
    );
};

export default My;

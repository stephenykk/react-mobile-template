import { TabBar, SafeArea } from 'antd-mobile'
import { AppOutline, TruckOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { connect } from "react-redux"

const FooterNav = (props) => {
    const { t } = useTranslation();
    const { shopNum } = props
    const navigate = useNavigate();
    const location = useLocation()
    const { pathname } = location
    const tabs = [
        {
            key: '/home',
            title: t('common.lang_home'),
            icon: <AppOutline />
        },
        {
            key: '/classify',
            title: t('common.lang_classify'),
            icon: <UnorderedListOutline />
        },
        {
            key: '/shop',
            title: t('common.lang_shop'),
            icon: <TruckOutline />,
            badge: shopNum,
        },
        {
            key: '/my',
            title: t('common.lang_my'),
            icon: <UserOutline />,
        },
    ]

    const setRouteActive = (value) => {
        navigate(value, { replace: true })
    }

    return (
        <>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
                ))}
            </TabBar>
            <SafeArea position='bottom' />
        </>
    )
}
const mapStateToProps = (state) => state.common;
export default connect(mapStateToProps)(FooterNav)
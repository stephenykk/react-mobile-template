import { NavBar } from 'antd-mobile'
const HeaderNav = (props) => {
    const navigate = useNavigate()
    const onBack = () => {
        navigate(-1)
    }
    return (
        <NavBar onBack={onBack} backArrow={props.backArrow}>
            {props.title}
        </NavBar>
    );
};

export default HeaderNav;

import { NavBar, Input, Button } from 'antd-mobile'
import { initFn } from '@/hooks/useCommon'
import styles from "./index.module.less"
const Login = () => {

    const navigate = useNavigate();
    const submitLogin = () => {
        initFn()
        navigate('/home', { replace: true })
    }
    return (
        <div className={styles.login_page}>
            <div className={styles.login_content}>

                <NavBar back={null}><span className={styles.title}>登录</span></NavBar>

                <div className={styles.item}>
                    <div className={styles.label}>用户名</div>
                    <div className={styles.input}>
                        <Input defaultValue={'admin'} placeholder='请输入用户名' />
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>密码</div>
                    <div className={styles.input}>
                        <Input defaultValue={'admin'} placeholder='请输入密码' type='password' />
                    </div>
                </div>

                <Button className={styles.btn} color='primary' fill='solid' onClick={() => { submitLogin() }}>登录</Button>
                <div className={styles.link}>还没有账号,去注册</div>
            </div>
        </div>
    );
};

export default Login;

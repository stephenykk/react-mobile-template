import { useState, useEffect } from 'react'
import { Button, Space } from 'antd-mobile'
import HeaderNav from "@/components/header-nav"
import styles from "./index.module.less"

const Detail = () => {

    const customNavigate = $globalNavigate()
    const [count, setCount] = useState(0)
    const [num, setNum] = useState(0)

    const getData = ()=>{
        const n = (new Date()).getTime()
        setNum(n)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="warp">
            <div className="header">
                <HeaderNav title="详情" ></HeaderNav>
            </div>
            <div className="content" style={{display:'flex',flexDirection:'column'}}>
                <div className={styles.content_body}>
                <Space>
                    <Button block size='large'>{count}</Button>
                </Space>
                <Space>
                    <Button block color='primary' size='large' onClick={() => { setCount(count + 1) }}>
                        数据加
                    </Button>
                </Space>
                <Space>
                    <Button block color='primary' size='large' onClick={() => { customNavigate('/404') }}>
                        跳转404
                    </Button>
                </Space>
                <Space>
                    <Button block color='primary' size='large' onClick={() => { customNavigate(-1) }}>
                        返回上一页
                    </Button>
                </Space>
                <Space>
                    <Button block color='primary' size='large' onClick={() => { customNavigate('/detail') }}>
                        跳转自己
                    </Button>
                </Space>
                </div>
            </div>
        </div>
    );
};

export default Detail;

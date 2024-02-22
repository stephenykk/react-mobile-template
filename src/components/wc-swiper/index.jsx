import React from 'react'
import { Swiper,Image } from 'antd-mobile'
const WcSwiper = (props) => {
    const { itemList = [] } = props
    return (
        <Swiper slideSize={70} trackOffset={15} loop stuckAtBoundary={false}>
            {
                itemList.map((item, index) => (
                    <Swiper.Item key={index}>
                        <div >
                        <Image height={150} lazy src={item.img} />
                        </div>
                    </Swiper.Item>
                ))
            }
        </Swiper>
    )
}

export default WcSwiper
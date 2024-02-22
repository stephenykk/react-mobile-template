import { useLocation } from "react-router-dom"
import { rootRouter } from "./useLoadRouter"

const $globalGuard = (props)=>{
    const { pathname } = useLocation()
    rootRouter.forEach((item)=>{
        const { path } = item
        if([pathname].includes(path) && path){
           // 进入页面时
        }
    })
    return props.children
}

export {
    $globalGuard
} 
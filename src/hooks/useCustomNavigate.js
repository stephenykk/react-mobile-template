import { useNavigate } from 'react-router-dom';
import { useAliveController } from 'react-activation';
import { rootRouter } from "./useLoadRouter"
const { MODE } = import.meta.env

const isRefresh = (pathValue) => {
  const isLen = rootRouter.filter((item) => {
    const { meta = {}, path = '' } = item
    const { isKeepAlive } = meta
    return [path].includes(pathValue) && isKeepAlive
  })
  return isLen.length !== 0
}

const $globalNavigate = () => {
  const { refreshScope } = useAliveController()
  const navigate = useNavigate();
  const customNavigate = (path, options) => {
    if (isRefresh(path)) {
      refreshScope(`${MODE}_${path}`)
    }
    navigate(path, options);
  }
  return customNavigate;
}

export {
  $globalNavigate
} 
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

const RefreshScroll = (props) => {
    return (
        <PullToRefresh onRefresh={props.onRefresh}>
            {props.children}
            {!props.isReadLoad ? <InfiniteScroll loadMore={props.loadMore} hasMore={props.hasMore} threshold={props.threshold || 10} /> : ''}
        </PullToRefresh>
    )
}

export default RefreshScroll
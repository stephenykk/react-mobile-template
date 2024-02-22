import { Checkbox, Button } from 'antd-mobile'
import styles from "./index.module.less"

const SubmitBtn = (props) => {
  const { totalPrice = 0, allchecked = false, allDisabled= false, allCheckbox } = props
  return (
    <div className={styles.total_btn}>
      <div className={styles.btn_left}>
        <Checkbox checked={allchecked} disabled={allDisabled} onChange={(val)=>{
          allCheckbox(val)
        }}>全选</Checkbox>
      </div>
      <div className={styles.btn_right}>
        <div className={styles.total_text}>
          <div>合计：</div>
          <div className={styles.total_text__num}>
            <span>¥</span>
            <span>{totalPrice}</span>
          </div>
        </div>
        <Button style={{ '--border-radius': '20px' }} size='small' color='danger'>提交订单</Button>
      </div>
    </div>
  );
};

export default SubmitBtn;

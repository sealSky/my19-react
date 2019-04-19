import React from 'react'
import { is, fromJS } from 'immutable'
import API from '../../api/api'

import PublicHeader from '../../components/header/Header'
import Touchable from '../../components/touchable/Touchable'
import Point from '../../components/point/point'

// 引入样式
import './balance.less'

interface BrokeRageStateFace {
  applyNum: string;
  alertStatus: boolean;
  alertTip: string;
  balance: number;
}

class BrokeRage extends React.Component<{}, BrokeRageStateFace> {
  constructor(props) {
    super(props);
    this.state = {
      applyNum: '',
      alertStatus: false,
      alertTip: '',
      balance: 0
    }

    // 绑定静态方法
    this.initData = this.initData.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  /* 静态方法 */
  // 初始化数据
  initData = async () => {
    let _this = this;
    try {
      let result: any = await API.getBalance();
      console.log(result);
      _this.setState({
        balance: result.balance
      })
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 格式化输入数据
   * 格式为微信红包格式：最大 200.00
   * @param  {object} event 事件对象
   */

  handleInput = event => {
    let value = event.target.value;
    let reg = /^d*?\.?\d{0, 2}?$/gi;
    if (reg.test(value)) {
      if ((/^0+[1-9]+/).test(value)) {
        value = value.replace(/^0+/, '');
      }
      if ((/^0{2}\./).test(value)) {
        value = value.replace(/^0+/, '0')
      }
      value = value.replace(/^\./gi, '0.');
      if (parseFloat(value) > 200) {
        value = '200.00'
      }
      this.setState({applyNum: value})
    }
  }

  // 提交判断条件
  submitForm = () => {
    let alertTip: string;
    if (!this.state.applyNum || '') {
      alertTip = '请输入体现金额';
    } else if (parseFloat(this.state.applyNum) > this.state.balance) {
      alertTip = '申请提现金额不能大于余额';
    } else {
      alertTip = '申请提现成功';
    }

    this.setState({
      alertStatus: true,
      alertTip,
      applyNum: '',
    })
  }

  // 关闭弹窗
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: '',
    })
  }

  // 生命周期方法
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || is(fromJS(this.state), fromJS(nextState))
  }

  componentDidMount() {
    this.initData();
  }

  render () {
    return (
      <main className="home-container">
        <PublicHeader title='提现' record />
        <section className="broke-main-content">
          <p className="broke-header">您的可提现金额为：¥ {this.state.balance || ''}</p>
          <form className="broke-form">
            <p>请输入提现金额（元）</p>
            <p>¥ <input type="text" value={this.state.applyNum || ''} placeholder="0.00" onChange={this.handleInput} maxLength={5}/></p>
          </form>
          <Touchable className="submit-btn" clickCallBack={this.submitForm} text="申请提现" />
        </section>
        <Point closeAlert={this.closeAlert} alertTip={this.state.alertTip || ''} alertStatus={this.state.alertStatus}/>
      </main>
    )
  }
}

export default BrokeRage;
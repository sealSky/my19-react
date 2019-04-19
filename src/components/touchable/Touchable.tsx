import React from 'react'
import { is, fromJS } from 'immutable'

/**
 * 点击状态组件
 * */
interface TouchablePropsFace {
  clickCallBack?: any;
  text?: string;
  className?: string;
}

class Touchable extends React.Component<TouchablePropsFace, {}> {
  btnRef: any;
  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  /*
  * 静态方法
  * */
  handleTouchStart = () => {
    this.btnRef.style.opacity = '0.3';
  }

  handleTouchEnd = () => {
    this.btnRef.style.opacity = '1';
    this.props.clickCallBack();
  }

  /*
  * 周期方法
  * */
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  render () {
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        ref='btn'
        className={`btn-con ${this.props.className}`}>
        {this.props.text || '确认'}
      </div>
    )
  }
}

export default Touchable;
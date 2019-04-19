import React from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import Touchable from '../touchable/Touchable'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'

import './point.less'

interface PointPropsFace {
  closeAlert?: any;
  alertTip?: string;
  alertStatus?: boolean;
}

class Point extends React.Component<PointPropsFace, {}> {
  constructor(props) {
    super(props);

  }

  /*
  * 静态方法
  * */
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childRenArray = React.Children.toArray(props.children);
    return childRenArray[0] || null;
  }

  // 关闭弹窗
  confirm = () => {
    this.props.closeAlert();
  }

  /*
  * 周期方法
  * */
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {
    return (
      <ReactCssTransitionGroup
        component={this.FirstChild}
        transitionName="alert"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {
          this.props.alertStatus &&
            <div className="alert-con">
              <div className="alert-context">
                <div className="alert-context-detail">{this.props.alertTip}</div>
                <Touchable className="confirm-btn" clickCallBack={this.confirm}/>
              </div>
            </div>
        }
      </ReactCssTransitionGroup>
    )
  }
}

export default Point;
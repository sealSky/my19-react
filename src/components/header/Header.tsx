import React from 'react'
import { is, fromJS } from 'immutable'
import { NavLink } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// 引入样式
import './header.less'

interface PublicHeaderPropsFace {
  record?: any;
  title?: string;
  confirm?: any;
}
interface PublicHeaderStateFace {
  navState: boolean;
}

class PublicHeader extends React.Component<PublicHeaderPropsFace, PublicHeaderStateFace> {
  constructor(props) {
    super(props);
    this.state = {
      navState: false
    }

    /*
    * 绑定静态方法
    * */
    this.toggleNav = this.toggleNav.bind(this);
    this.firstChild = this.firstChild.bind(this);
  }

  /*
  * 静态方法
  * */

  // 切换左侧导航栏状态
  toggleNav = () => {
    console.log(2);
    this.setState({navState: !this.state.navState});
  }

  // css动画组件设置未目标组件
  firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }

  /*
  * 周期方法
  * */
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
  }

  render () {
    return (
      <header className="header-container">
        <span className="header-slide-icon iconfont icon-mulu" onClick={this.toggleNav} />
        <span className="header-title">{this.props.title}</span>
        {
          this.props.record && <NavLink to="/record" exact className="header-link iconfont icon-wenzhang" />
        }
        <ReactCSSTransitionGroup
          component={this.firstChild}
          transitionName="nav"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            this.state.navState && <aside key='nav-slide' className="nav-slide-list" onClick={this.toggleNav}>
              <NavLink to="/" exact className="nav-link iconfont icon-arrow_right">首页</NavLink>
              <NavLink to="/balance" exact className="nav-link iconfont icon-arrow_right">提现</NavLink>
              <NavLink to="/help" exact className="nav-link iconfont icon-arrow_right">帮助中心</NavLink>
            </aside>
          }
        </ReactCSSTransitionGroup>

      </header>
    )
  }
}

export default PublicHeader;
import React from 'react'

interface IndexState {
  productList: Array<any>;
  params: string;
}

class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      params: ''
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  /* 更新触发的钩子函数 */
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    // 组件更新前调用
  }

  componentDidUpdate() {
    // 组件更新后调用
  }

  componentWillUnmount() {
    // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除
  }


  render() {
    return (
      <div>首页</div>
    )
  }
}

export default Index;
import React, { Component } from 'react'

interface AsyncComponentFace {
  component: null | string;
}

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component<{}, AsyncComponentFace> {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({component});
    }

    render () {
      const C: any = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
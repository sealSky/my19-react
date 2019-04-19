import React from 'react'
import Header from '../../components/header/Header'
import { is, fromJS } from 'immutable'
import './help.less'

export default class Help extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), nextProps) || !is(fromJS(this.state), nextState)
  }

  render () {
    return (
      <main>
        <Header title="帮助中心" record />
        <article className="context-con">
          <h2>介绍</h2>
          <p>本项目主要用于理解 react 和 redux 的编译方式，以及 react + redux 之间的配合方式</p>
          <h2>技术要点</h2>
          <p>react: 16.8.3</p>
          <p>redux：v4.0.1</p>
          <p>webpack：v4.28.3</p>
          <p>react-router：v5.0.0</p>
          <p>ES 6/7/8</p>
          <p>code split</p>
          <p>hot loader</p>
          <p>axios：v0.18.0</p>
          <p>less：v3.9.0</p>
          <p>immutable：v4.0.0-rc.12</p>
          <p>项目地址 <a href="https://github.com/sealSky/my19-react">github</a></p>
        </article>
      </main>
    )
  }
}
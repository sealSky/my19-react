import React from 'react'
import Remarkable from 'remarkable'

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '这是默认的文本库' }

    //  绑定事件
    this.handleChange = this.handleChange.bind(this);
    this.getRawMarkup = this.getRawMarkup.bind(this);

  }

  /* 静态方法 */
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.state.value) }
  }

  render() {
    return (
      <div className="editor">
        <h3>请输入</h3>
        <textarea
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />

        <h3>输出</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        >
        </div>
      </div>
    )
  }
}

export default Library
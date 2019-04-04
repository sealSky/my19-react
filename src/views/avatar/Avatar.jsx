import React, { Component }  from 'react'

const ProfilePic = (props) => {
  return (
    <img src={'http://graph.facebook.com/' + props.username + '/picture'} alt=""/>
  );
}

const ProfileLink = (props) => {
  return (
    <a href={'http://www.facebook.com/' + props.username}>
      {props.username}
    </a>
  );
}

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <ProfilePic username={this.props.username}/>
        <ProfileLink username={this.props.username}/>
      </div>
    )
  }
}
export default Avatar;
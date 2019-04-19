import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { is, fromJS } from 'immutable'
import PropTypes from 'prop-types'
import API, {ResultFace} from '../../api/api'
import envconfig from '../../envconfig/envconfig'
import { saveFormData, saveImg, clearData } from '../../store/home/action'
import { clearSelected } from '../../store/production/action'

import mixin, { padStr } from '../../utils/unit'

import PublicHeader from '../../components/header/Header'
import Touchable from '../../components/touchable/Touchable'
import Point from '../../components/point/point'


import './home.less'

interface HomeStateFace {
  // 弹窗状态
  alertStatus: boolean;
  alertTip: string;
}

interface HomePropsFace {
  saveFormData: any;
  saveImg: any;
  formData: any;
  clearSelected: Function;
  clearData: Function;
  proData: any;
}

const defaultProp = {

}

class Home extends React.Component<HomePropsFace, HomeStateFace> {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImg: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      alertStatus: false,
      alertTip: '',
    }

    /* 绑定静态方法 */
    this.handleInput = this.handleInput.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.initData = this.initData.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.proData), fromJS(nextProps.proData))) {
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  componentWillUnmount() {
    this.initData(this.props);
  }

  /* 静态方法 */
  /*
  * 已选择的商品数据
  * */
  selectedProList: Array<any> = [];

  /**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */

  handleInput = (type, event) => {
    let value = event.target.value;
    switch (type) {
      case 'orderSum':
        value = value.replace(/\D/g, '');
        break;
      case 'name':
        break;
      case 'phoneNumber':
        value = padStr(value.replace(/\D/g, [3, 7], ' ', event.target));
        break;
      default:
        break;
    }
    this.props.saveFormData(value, type);
  }

  /*
   *上传图片，并将图片地址存到redux，保留状态
   */
  uploadImg = async event => {
    try {
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      let result: ResultFace = await API.uploadImg({data: formData});
      this.props.saveImg(envconfig.imgUrl + result.image_path);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  // 提交表单
  submitForm = () => {
    const { orderSum, name, phoneNumber } = this.props.formData;
    let alertTip = '';
    if (!orderSum.toString().length) {
      alertTip = '请填写金额';
    } else if (!name.toString().length) {
      alertTip = '请填写姓名';
    } else if (!phoneNumber.toString().length) {
      alertTip = '请填写正确的手机号';
    } else {
      alertTip = '添加数据成功';
      this.props.clearSelected();
      this.props.clearData();
    }

    this.setState({
      alertStatus: true,
      alertTip,
    })
  }

  // 关闭弹窗
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: ''
    })
  }

  // 初始化数据，获取已选择的商品
  initData = props => {
    this.selectedProList = [];
    props.proData.dataList.forEach(item => {
      if (item.selectStatus && item.selectNum) {
        this.selectedProList.push(item);
      }
    })
  }

  render() {
    return (
      <main className="home-container">
        <PublicHeader title='首页' record />
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>销售金额：</span>
            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum || 0} onChange={this.handleInput.bind(this, 'orderSum')} />
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input
              type="text" placeholder="请输入客户姓名"
              onChange={this.handleInput.bind(this,'name')}
              value={this.props.formData.name || ''} />
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input placeholder="请输入客户电话"
              value={this.props.formData.phoneNumber || ''}
              onChange={this.handleInput.bind(this, 'phoneNumber')}
              maxLength={13}
              type="text"/>
          </div>
        </form>
        <div>
          <p className="common-title">请选择销售的产品</p>
          <Link to="/production" className="common-select-btn">
            {
              this.selectedProList.length ? <ul className="selected-pro-list">
                {
                  this.selectedProList.map((item, index) => {
                    return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                  })
                }
              </ul>:'选择产品'
            }
          </Link>
        </div>
        <div className="upload-img-con">
          <p className="common-title">请上传发票凭证</p>
          <div className="file-lable">
            <span className="common-select-btn">上传图片</span>
            <input type="file" onChange={this.uploadImg}/>
          </div>
          <img src={this.props.formData.img_path || ''} className="select-img" alt=""/>
        </div>
        <Touchable className="submit-btn" clickCallBack={this.submitForm} text="提交"  />
        <Point closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
      </main>
    )
  }
}

export default connect(state => ({
  formData: state.formData,
  proData: state.proData,
}), {
  saveFormData,
  saveImg,
  clearData,
  clearSelected
})(Home);
import * as pro from './action-type'
import Immutable from 'immutable'

interface ProductFace {
  product_id: number;
  product_name: string;
  product_price: number;
  commission: number;
  selectStatus: boolean;
  selectNum: number;
  action?: any;
}

interface StateFace {
  dataList: Array<ProductFace | any>;
}

let defaultState: StateFace = {
  /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: [],
}

export const proData = (state: StateFace = defaultState, action: any) => {
  let imuDataList;
  let imuItem;
  switch (action.type) {
    case pro.GET_PRODUCTION:
      return { ...state, ...action };
    case pro.TOGGLES_ELECT:
      // 避免引用类型数据，使用immutable进行数据转换
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux 必须返回一个新的state
      return { ...state, ...{dataList: imuDataList.toJS()} };
    case pro.EDIT_PRODUCTION:
      //避免引用类型数据，使用immutable进行数据转换
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectNum', action.selectNum);
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux必须返回一个新的state
      return {...state, ...{dataList: imuDataList.toJS()}};
    // 清空数据
    case pro.CLEAR_SELECTED:
      imuDataList = Immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item('selectStatus', false);
          item = item.set('selectNum', 0);
          return item
        })
      }
      return { ...state, ...{dataList: imuDataList.toJS()} };
    default:
      return state;
  }
}
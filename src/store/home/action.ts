import * as home from './action-type';

// 保存表单数据
export const saveFormData = (value, dataType) => {
  return {
    type: home.SAVE_FORM_DATA,
    value,
    dataType,
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: home.SAVE_IMG,
    path,
  }
}

// 清空数据
export const clearData = () => {
  return {
    type: home.CLEAR_DATA,
  }
}
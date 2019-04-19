import * as home from './action-type';

interface FormState {
   // 其他金额
   orderSum: number | string;
   // 姓名
   name: string;
   // 手机号
   phoneNumber: number | null;
   // 图片地址
   img_path: string;
}

const defaultState: FormState = {
  orderSum: 0,
  name: '',
  phoneNumber: null,
  img_path: ''
}

export const formData = (state = defaultState, action: any = {}) => {
  switch (action.type) {
    case home.SAVE_FORM_DATA:
      return { ...state, ...{[action.dataType]: action.value}};
    case home.SAVE_IMG:
      return { ...state, ...{img_path: action.path} };
    case home.CLEAR_DATA:
      return { ...state, ...defaultState };
    default:
      return state;
  }
}
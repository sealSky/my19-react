/*
* 全局配置文件
* */
export let baseUrl: string = '';
export let imgUrl = '//elm.cangdu.org/img/';
if (process.env.NODE_ENV === 'development') {
  baseUrl = '//api.candu.org'
} else {
  baseUrl = '//api.candu.org'
}

export default {
  imgUrl,
  baseUrl
}
import Server from './server'
import {Res} from "awesome-typescript-loader/dist/checker/protocol";

const urlHeader = 'http://api.cangdu.org/shopro/data';

interface APIFace {
  url: string;
  method: string;
  callback: any;
}

// 返回值的接口
export interface ResultFace {
  status?: number | string;
  data?: any;
  http_code?: number;
  image_path?: string;
}

interface ErrFace {
  msg: string;
  response: ResultFace;
  data: any;
  url: string;
}

class API extends Server {

  /**
   *  用途：上传图片
   *  @url http://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @callback {promise}
   * */
  async uploadImg(params = {}) {
    try {
      let result: ResultFace = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', params);
      if (result && result.status === 1) {
        return result;
      } else {
        let err: ErrFace = {
          msg: '上传图片失败',
          response: result,
          data: params,
          url: '//ele.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    } catch (err) {
      throw(err)
    }
  }

  /**
   *  用途：获取记录数据
   *  @url http://api.cangdu.org/shopro/data/record
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
  async getRecord(params: any = {}) {
    try {
      let result: ResultFace = await this.axios('get', `${urlHeader}/record/${params.type}`, {});

      if (result && (result.data instanceof Object) && result.http_code === 200) {
        return result.data;
      } else {
        let err: ErrFace = {
          msg: '获取记录数据失败',
          response: result,
          data: params,
          url: 'http://api.cangdu.org/shopro/data/record'
        }
        throw err;
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   *  用途：获取商品数据
   *  @url http://api.cangdu.org/shopro/data/products
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */

  async getProduction(params: any = {}) {
    try{
      let result: ResultFace = await this.axios('get', `${urlHeader}/products`, params);
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||[];
      }else{
        let err = {
          tip: '获取商品数据失败',
          response: result,
          data: params,
          url: 'http://api.cangdu.org/shopro/data/products',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  用途：获取佣金数据
   *  @url http://api.cangdu.org/shopro/data/balance
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */

  async getBalance(params = {}) {
    try{
      let result: ResultFace = await this.axios('get', `${urlHeader}/balance`, params);
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||{};
      }else{
        let err = {
          tip: '获取佣金数据失败',
          response: result,
          data: params,
          url: 'http://api.cangdu.org/shopro/data/balance',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();
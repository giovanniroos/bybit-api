import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getBaseRESTInverseUrl, RestClientInverseOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export class RestClient {
  private requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the inverse REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [useLivenet=false]
   * @param {RestClientInverseOptions} [restInverseOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    useLivenet?: boolean,
    restInverseOptions: RestClientInverseOptions = {},
    httpOptions: AxiosRequestConfig = {}
  ) {
    this.requestWrapper = new RequestWrapper(
      key,
      secret,
      getBaseRESTInverseUrl(useLivenet),
      restInverseOptions,
      httpOptions
    );
    return this;
  }

  /**
   *
   * Market Data Endpoints
   *
   */

  getOrderBook(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/orderBook/L2', params);
  }

  getKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/kline/list', params);
  }

  /**
   * @deprecated use getTickers() instead
   */
  getLatestInformation(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.getTickers(params);
  }

  getTickers(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/tickers', params);
  }

  /**
   * @deprecated use getTrades() instead
   */
  getPublicTradingRecords(params: {
    symbol: string;
    from?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.getTrades(params);
  }

  getTrades(params: {
    symbol: string;
    from?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/trading-records', params);
  }

  getSymbols(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/symbols');
  }

  /**
   * @deprecated use getLiquidations() instead
   */
  getPublicLiquidations(params: {
    symbol: string;
    from?: number;
    limit?: number;
    start_time?: number;
    end_time?: number;
  }): GenericAPIResponse {
    return this.getLiquidations(params);
  }

  getLiquidations(params: {
    symbol: string;
    from?: number;
    limit?: number;
    start_time?: number;
    end_time?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/liq-records', params);
  }

  getMarkPriceKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/mark-price-kline', params);
  }

  getOpenInterest(params: {
    symbol: string;
    period: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(params: {
    symbol: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/big-deal', params);
  }

  getLongShortRatio(params: {
    symbol: string;
    period: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/account-ratio', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  placeActiveOrder(orderRequest: {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    time_in_force: string;
    take_profit?: number;
    stop_loss?: number;
    reduce_only?: boolean;
    close_on_trigger?: boolean;
    order_link_id?: string;
  }): GenericAPIResponse {
    // if (orderRequest.order_type === 'Limit' && !orderRequest.price) {
    //   throw new Error('Price required for limit orders');
    // }
    return this.requestWrapper.post('v2/private/order/create', orderRequest);
  }

  getActiveOrderList(params: {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/order/list', params);
  }

  /**
   * @deprecated use getActiveOrderList() instead
   */
  getActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol?: string;
    order?: string;
    page?: number;
    limit?: number;
    order_status?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    // if (!params.order_id && !params.order_link_id) {
    //   throw new Error('Parameter order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('v2/private/order/cancel', params);
  }

  cancelAllActiveOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/cancelAll', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: string;
    p_r_price?: string;
  }): GenericAPIResponse {
    // if (!params.order_id && !params.order_link_id) {
    //   throw new Error('Parameter order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('v2/private/order/replace', params);
  }

  /**
   * @deprecated use replaceActiveOrder()
   */
  replaceActiveOrderOld(params: any): GenericAPIResponse {
    // if (!params.order_id && !params.order_link_id) {
    //   throw new Error('Parameter order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('open-api/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    // if (!params.order_id && !params.order_link_id) {
    //   throw new Error('Parameter order_id OR order_link_id is required');
    // }
    return this.requestWrapper.get('v2/private/order', params);
  }

  placeConditionalOrder(params: {
    side: string;
    symbol: string;
    order_type: string;
    qty: string;
    price?: string;
    base_price: string;
    stop_px: string;
    time_in_force: string;
    trigger_by?: string;
    close_on_trigger?: boolean;
    order_link_id?: string;
  }): GenericAPIResponse {
    // if (params.order_type === 'Limit' && !params.price) {
    //   throw new Error('Parameter price is required for limit orders');
    // }
    return this.requestWrapper.post('v2/private/stop-order/create', params);
  }

  /**
   * @deprecated use placeConditionalOrder
   */
  placeConditionalOrderOld(params: any): GenericAPIResponse {
    // if (params.order_type === 'Limit' && !params.price) {
    //   throw new Error('Parameter price is required for limit orders');
    // }
    return this.requestWrapper.post('open-api/stop-order/create', params);
  }

  getConditionalOrder(params: {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/stop-order/list', params);
  }

  /**
   * @deprecated use placeConditionalOrder
   */
  getConditionalOrderOld(params: any): GenericAPIResponse {
    return this.requestWrapper.get('open-api/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    // if (!params.stop_order_id && !params.order_link_id) {
    //   throw new Error('Parameter stop_order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('v2/private/stop-order/cancel', params);
  }

  /**
   * @deprecated use cancelConditionalOrder
   */
  cancelConditionalOrderOld(params: any): GenericAPIResponse {
    // if (!params.stop_order_id && !params.order_link_id) {
    //   throw new Error('Parameter stop_order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('open-api/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/stop-order/cancelAll', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    p_r_trigger_price?: string;
  }): GenericAPIResponse {
    // if (!params.stop_order_id && !params.order_link_id) {
    //   throw new Error('Parameter stop_order_id OR order_link_id is required');
    // }
    return this.requestWrapper.post('v2/private/stop-order/replace', params);
  }

  /**
   * @deprecated use replaceConditionalOrder
   */
  replaceConditionalOrderOld(params: any): GenericAPIResponse {
    return this.requestWrapper.post('open-api/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    // if (!params.stop_order_id && !params.order_link_id) {
    //   throw new Error('Parameter stop_order_id OR order_link_id is required');
    // }
    return this.requestWrapper.get('v2/private/stop-order', params);
  }

  /**
   * @deprecated use getPosition() instead
   */
  getUserLeverage(): GenericAPIResponse {
    return this.requestWrapper.get('user/leverage');
  }

  getPosition(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/position/list', params);
  }

  /**
   * @deprecated use getPosition() instead
   */
  getPositions(): GenericAPIResponse {
    return this.requestWrapper.get('position/list');
  }

  changePositionMargin(params: {
    symbol: string;
    margin: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('position/change-position-margin', params);
  }

  setTradingStop(params: {
    symbol: string;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    new_trailing_active?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('open-api/position/trading-stop', params);
  }

  setUserLeverage(params: {
    symbol: string;
    leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('user/leverage/save', params);
  }

  /**
   * @deprecated use setUserLeverage() instead
   */
  changeUserLeverage(params: any): GenericAPIResponse {
    return this.setUserLeverage(params);
  }

  getTradeRecords(params: {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/trade/closed-pnl/list', params);
  }

  getRiskLimitList(): GenericAPIResponse {
    return this.requestWrapper.get('open-api/wallet/risk-limit/list');
  }

  setRiskLimit(params: {
    symbol: string;
    risk_id: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('open-api/wallet/risk-limit', params);
  }

  getLastFundingRate(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/funding/prev-funding-rate', params);
  }

  getMyLastFundingFee(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/funding/prev-funding', params);
  }

  getPredictedFunding(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/funding/predicted-funding', params);
  }

  getApiKeyInfo(): GenericAPIResponse {
    return this.requestWrapper.get('open-api/api-key');
  }

  getLcpInfo(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/account/lcp', params);
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  getWalletBalance(params?: {
    coin?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/balance', params);
  }

  getWalletFundRecords(params?: {
    start_date?: string;
    end_date?: string;
    currency?: string;
    coin?: string;
    wallet_fund_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/wallet/fund/records', params);
  }

  getWithdrawRecords(params: {
    start_date?: string;
    end_date?: string;
    coin?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('open-api/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(params?: {
    limit?: number;
    from?: number;
    direction?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/exchange-order/list', params);
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/time');
  }

  getApiAnnouncements(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/announcement');
  }

  async getTimeOffset(): Promise<number> {
    const start = Date.now();
    return this.getServerTime().then(result => {
      const end = Date.now();
      return Math.ceil((result.time_now * 1000) - end + ((end - start) / 2));
    });
  }
};

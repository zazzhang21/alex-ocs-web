/*! ocs-web 2016-09-26 */
define(["angular"],function(a){"use strict";return a.module("appBizs.orderBizs",[]).service("orderBiz",["$http","promiseService","SystemConfig","Upload","$base64","$q","$cookies",function(b,c,d,e,f,g,h){return{getOrderList:function(a){return c.getPromise(d.url_orderList,a,"POST")},getOrderDetail:function(a){return c.getPromise(d.url_orderDetail,a,"POST")},getSystemDate:function(){return c.getPromise(d.url_systemDate,null,"POST")},createOrder:function(a){return c.getPromise(d.url_createOrder,a,"POST")},batchPlaceOrder:function(b){var c=g.defer();return e.http({url:d.ocs_url+d.url_batchCreateOrder,headers:{"ocs-client-id":"O2O-Business-Web","x-up-Authorization":"B-Token "+f.encode(h.get("B-token")),"Content-Type":void 0},data:b,transformRequest:a.identity}).progress(function(a){c.notify(a)}).success(function(a,b,d,e){c.resolve(a)}).error(function(a,b,d,e){c.reject(a)}),c.promise},getPrintOrderList:function(a){return c.getPromise(d.url_printOrderList,a,"POST")},modifyOrderAddress:function(a){return c.getPromise(d.url_modifyOrderAddress,a,"POST")},cancelOrder:function(a){return c.getPromise(d.url_cancelOrder,a,"POST")},exportOrders:function(a){var c=g.defer(),e=a;return b({method:"POST",url:d.ocs_url+d.url_orderExport,data:e,headers:{"ocs-client-id":"O2O-Business-Web","x-up-Authorization":"B-Token "+f.encode(h.get("B-token"))},timeout:3e4,responseType:"arraybuffer"}).success(function(a){c.resolve(a)}).error(function(a,b){601==b?c.reject({type:"warning",text:"导出数据量超过1万条，请缩短日期范围进行导出",data:a,config:b}):c.reject({type:"warning",text:"网络异常",data:a,config:b})}),c.promise},getAddressBookList:function(a){return c.getPromise(d.url_addressBookList,a,"POST")},getAuditOrderList:function(a){return c.getPromise(d.url_auditOrders,a,"POST")}}}])});
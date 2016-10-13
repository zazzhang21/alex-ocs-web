/*! ocs-web 2016-09-26 */
define(["angular"],function(a){"use strict";return a.module("appBizs.systemBizs",[]).factory("promiseService",["$http","$q","$cookies","$base64","SystemConfig",function(a,b,c,d,e){return{getPromise:function(f,g,h){var i=b.defer(),j=g;return h=h&&"GET"==h?"GET":"POST",a({method:h,url:e.ocs_url+f,data:"POST"==h?j:"",params:"GET"==h?j:"",headers:{"ocs-client-id":"O2O-Business-Web","x-up-Authorization":"B-Token "+d.encode(c.get("B-token"))},timeout:1e4}).success(function(a){i.resolve(a)}).error(function(a,b){i.reject({type:"warning",text:"网络异常",data:a,config:b})}),i.promise}}}]).factory("CacheBiz",[function(b,c){return{getCacheFromSession:function(b){var c=window.sessionStorage[b];return c?a.fromJson(c):null},setCacheToSession:function(b,c){window.sessionStorage[b]=a.toJson(c)},removeCacheFromSession:function(a){window.sessionStorage.removeItem(a)},getCacheFromLocal:function(b){var c=window.localStorage[b];return c?a.fromJson(c):null},setCacheToLocal:function(b,c){window.localStorage[b]=a.toJson(c)},removeCacheFromLocal:function(a){window.localStorage.removeItem(a)}}}]).factory("ValidateBiz",["$http","$q",function(a,b){return{reg:function(a,b){var c=!1,d={regEmail:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,regName:/^[a-z0-9_-]{3,16}$/,regMobile:/^0?1[3|4|5|8][0-9]\d{8}$/,regTel:/^0?1[3|4|5|7|8][0-9]\d{8}$|^[\d]{7,8}$/,reDigit:/^\d+(\.\d+)?$/};switch(a){case 1:c=d.regEmail.test(b);break;case 2:c=d.regName.test(b);break;case 3:c=d.regMobile.test(b);break;case 4:c=d.regTel.test(b);break;case 5:c=d.reDigit.test(b)}return c}}}])});
// 引入fetch拦截器,
//在页面中调用直接import引入这个js文件，然后通过xx.xx的方式来使用本文件中的api
import fetch from '@/libs/fetch';

export default {
	// 所有药店
	postMethod() {
		const data = {
		};
		return fetch({
			url: '/maindata-admin/v1/pharmacyInfo/all/pharmacy',
			method: 'POST',
			data
		});
	},
	getMethod1() {
		return fetch({
			url: '/oss/dict/values/OSS_TYPE,DEPARTMENT',
			method: 'GET'
		});
	},

	// 获取所有省市区
    getMethod2(orderNo) {
        return fetch({
            url: '/maindata-admin/v1/pharmacyInfo/all/pharmacy?orderNo='+orderNo,
            method: 'GET',
        });
    },


}

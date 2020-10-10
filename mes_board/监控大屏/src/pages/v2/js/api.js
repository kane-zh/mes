import axios from 'axios'
const bdUrl = '/ttt/json/tongji/v1/ReportService/getData'
// 趋势数据，近一个月每日
export const monthAgoDays = ()=>{
    return axios({
        url:bdUrl,
        method:'post',
        data:JSON.stringify({
            "header": {
                "username": "wztf121",
                "password": "strong",
                "token": "eeec8b3e0cd021e999ea9c56cddc8741",
                "account_type": 1
            },
            "body": {
                "site_id": "3223547",
		        "start_date": "20190303",
		        "end_date": "20190305",
		        "metrics": "",
		        "method": "visit/topdomain/a"
            }
        })
    })
}